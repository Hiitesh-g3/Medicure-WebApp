import express from "express";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    // Prepare form-data for ML microservice
    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    // Call ML service
    const mlResponse = await axios.post(
      "http://localhost:9000/analyze-image",
      formData,
      { headers: formData.getHeaders(), timeout: 300000 }
    );

    const fullData = mlResponse.data.data;
    const med = fullData.ai_parsed?.medicines?.[0] || null;

    // ⭐ Even if medicine is not found, we return fallback result (NOT fail)
    if (!med) {
      return res.status(200).json({
        success: true,
        result: {
          medicine_name: "Not clearly detected",
          brand_name: "",
          generic_name: "",
          composition: "",
          uses: "Not enough information to determine uses.",
          side_effects: "",
          precautions: "",
          drug_interactions: "",
          notes:
            "The system could not confidently identify the medicine. Try a clearer image.",
          alternatives: [],
        },
        raw: fullData,
      });
    }

    // ⭐ Map ML output → UI expected format
    // ⭐ Map ML output → UI expected format
    const formatted = {
      medicine_name: med.brand_name,
      brand_name: med.brand_name,
      generic_name: med.generic_name,
      composition: med.composition,
      uses: med.uses,
      side_effects: med.side_effects,
      precautions: med.precautions,
      drug_interactions: med.interactions,
      notes: med.notes,

      // ⭐ FIX: Normalize alternatives to objects
      alternatives: (med.cheaper_alternatives || []).map((alt) => {
        if (typeof alt === "string") {
          return {
            name: alt,
            availability: "Available at most pharmacies",
            price_comparison: "Cheaper alternative",
            notes: "",
          };
        }
        return alt;
      }),
    };

    const scanId = mlResponse.data.scan_id || null;

    return res.status(200).json({
      success: true,
      scan_id: scanId, // 🔑 NEW: Include the scan ID for the chatbot
      result: formatted,
      raw: fullData,
    });
  } catch (error) {
    console.error("Error calling ML service:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to process medicine image",
      details: error.message,
    });
  }
});

export default router;
