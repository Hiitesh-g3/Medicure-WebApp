import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import PillImage from "../models/PillImage.js";
import DrugCatalog from "../models/DrugCatalog.js";


const router = express.Router();

// create folder if not exists
const uploadDir = path.join(process.cwd(), "uploads", "pills");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// configure multer for disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_.-]/g, "");
    cb(null, `${timestamp}_${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // limit: 5MB
});

// basic upload route (no DB yet)
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      // optional consent (frontend should send this as true/false)
      const consent = req.body.consent === "true" || req.body.consent === true;
  
      // determine uploader type (we’ll improve this later)
      // assuming you set req.user and req.userType from your auth middleware
      const userId = req.user?._id || null;
      const userType = req.userType || "Anonymous";
      console.log(userType);
  
      // create Mongo document
      const newImage = new PillImage({
        user_id: userId,
        user_type: userType,
        filename: req.file.filename,
        original_name: req.file.originalname,
        path: req.file.path,
        content_type: req.file.mimetype,
        size: req.file.size,
        consent_to_store: consent,
        status: "pending",
      });
  
      await newImage.save();
  
      res.json({
        success: true,
        message: "File uploaded and saved successfully!",
        imageId: newImage._id,
        file: req.file.filename,
      });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: "upload_failed", details: err.message });
    }
  });

  router.post("/confirm", async (req, res) => {
    try {
      const { imageId, label, generic_name, dose_mg } = req.body;
  
      if (!imageId || !label) {
        return res.status(400).json({ error: "imageId and label are required" });
      }
  
      // find the uploaded image record
      const pillImage = await PillImage.findById(imageId);
      if (!pillImage) {
        return res.status(404).json({ error: "Image not found" });
      }
  
      // attach confirmed label details
      pillImage.confirmed_label = {
        label,
        generic_name,
        dose_mg: dose_mg ? Number(dose_mg) : undefined,
        labeled_by: req.user?._id || null,
        labeled_by_type: req.userType || "Anonymous",
        labeled_at: new Date(),
      };
  
      pillImage.status = "labeled";
  
      await pillImage.save();
  
      res.json({
        success: true,
        message: "Medicine label saved successfully!",
        imageId: pillImage._id,
        confirmed_label: pillImage.confirmed_label,
      });
    } catch (err) {
      console.error("Confirm label error:", err);
      res.status(500).json({ error: "confirm_failed", details: err.message });
    }
  });

  router.post("/manual", async (req, res) => {
    try {
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).json({ error: "Medicine name is required" });
      }
  
      // normalize and create regex for case-insensitive search
      const regex = new RegExp(name.trim(), "i");
  
      // search by brand_name or generic_name
      const medicines = await DrugCatalog.find({
        $or: [{ brand_name: regex }, { generic_name: regex }],
      }).limit(10);
  
      if (medicines.length === 0) {
        return res.status(404).json({ message: "No matching medicine found" });
      }
  
      // format response
      const results = medicines.map((med) => {
        const janAlt = med.price_list?.filter((p) =>
          p.vendor.toLowerCase().includes("jan")
        );
  
        return {
          brand_name: med.brand_name,
          generic_name: med.generic_name,
          description: med.description || "No description available yet.",
          side_effects: med.side_effects || [],
          form: med.form || "N/A",
          active_ingredients: med.active_ingredients || [],
          jan_aushadhi_alternatives: janAlt?.length ? janAlt : [],
        };
      });
  
      res.json({ count: results.length, results });
    } catch (err) {
      console.error("Manual medicine lookup error:", err);
      res.status(500).json({ error: "manual_lookup_failed", details: err.message });
    }
  });

  router.get("/status/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const pillImage = await PillImage.findById(id);
      if (!pillImage) {
        return res.status(404).json({ error: "Image not found" });
      }
  
      res.json({
        status: pillImage.status,
        confirmed_label: pillImage.confirmed_label || null,
        ocr_text: pillImage.ocr_text || null,
        uploaded_at: pillImage.uploaded_at,
        filename: pillImage.filename,
      });
    } catch (err) {
      console.error("Status check error:", err);
      res.status(500).json({ error: "status_check_failed", details: err.message });
    }
  });



router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const pillImage = await PillImage.findById(id);
    if (!pillImage) {
      return res.status(404).json({ error: "Image not found" });
    }

    // check permission — only the uploader or an admin can delete
    const userId = req.user?._id || req.guser?._id;
    const isOwner = pillImage.user_id?.toString() === userId?.toString();
    const isAdmin = req.user?.role === "admin"; // if you have roles
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: "Not authorized to delete this image" });
    }

    // delete file from uploads folder (if exists)
    if (fs.existsSync(pillImage.path)) {
      fs.unlinkSync(pillImage.path);
    }

    // remove record from MongoDB
    await PillImage.deleteOne({ _id: id });

    res.json({ success: true, message: "Image deleted successfully!" });
  } catch (err) {
    console.error("Delete image error:", err);
    res.status(500).json({ error: "delete_failed", details: err.message });
  }
});

  
router.get("/export", async (req, res) => {
    try {
      // only allow admin to export (optional but safer)
      if (req.userType !== "User" || req.user?.role !== "admin") {
        return res.status(403).json({ error: "Only admins can export dataset" });
      }
  
      const labeledData = await PillImage.find({
        consent_to_store: true,
        status: { $in: ["labeled", "confirmed"] },
      }).select("-__v"); // omit internal mongoose field
  
      if (!labeledData.length) {
        return res.status(404).json({ message: "No labeled data available" });
      }
  
      // format output
      const exportData = labeledData.map((item) => ({
        id: item._id,
        filename: item.filename,
        label: item.confirmed_label?.label,
        generic_name: item.confirmed_label?.generic_name,
        dose_mg: item.confirmed_label?.dose_mg,
        path: item.path,
        consent_to_store: item.consent_to_store,
      }));
  
      res.json({
        count: exportData.length,
        data: exportData,
      });
    } catch (err) {
      console.error("Export data error:", err);
      res.status(500).json({ error: "export_failed", details: err.message });
    }
  });
  
  

export default router;
