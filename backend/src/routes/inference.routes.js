import express from "express";
import axios from "axios";
import multer from "multer";
import FormData from "form-data";
import fs from "fs";

const router = express.Router();

// Multer setup
const upload = multer({ dest: "uploads/" });

// 🧠 IMAGE PREDICTION ROUTE
router.post("/predict", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imagePath = req.file.path;
    const formData = new FormData();
    formData.append("image", fs.createReadStream(imagePath));

    const flaskURL = "http://127.0.0.1:5001/predict";

    const response = await axios.post(flaskURL, formData, {
      headers: formData.getHeaders(),
    });

    fs.unlinkSync(imagePath); // cleanup temp file
    res.json(response.data);

  } catch (error) {
    console.error("❌ Error calling AI microservice (predict):", error.message);
    res.status(500).json({ error: "Failed to get AI prediction" });
  }
});

// 🔤 MANUAL SEARCH ROUTE
router.post("/search", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Medicine name is required" });
    }

    const flaskURL = "http://127.0.0.1:5001/search";

    const response = await axios.post(flaskURL, { query });
    res.json(response.data);

  } catch (error) {
    console.error("❌ Error calling AI microservice (search):", error.message);
    res.status(500).json({ error: "Failed to fetch AI search result" });
  }
});

export default router;

