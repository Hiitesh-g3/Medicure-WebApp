import express from "express";
import protectRoute from "../middlewares/auth.middleware.js";
import PredictionHistory from "../models/predictionHistory.model.js";

const girouter = express.Router();

router.post("/save", protectRoute, async (req, res) => {
    try {
      console.log("🧩 Incoming Prediction Save Request:", req.body);
  
      const { inputType, inputValue, detectedMedicine, genericName, result, confidence } = req.body;
  
      if (!inputType || !inputValue) {
        return res.status(400).json({ success: false, message: "inputType and inputValue are required" });
      }
  
      const newRecord = await PredictionHistory.create({
        userId: req.user._id,
        userType: req.userType,
        inputType,
        inputValue,
        detectedMedicine,
        genericName,
        result,
        confidence
      });
  
      res.status(201).json({ success: true, data: newRecord });
    } catch (err) {
      console.error("❌ Error saving prediction history:", err);
      res.status(500).json({ success: false, message: "Failed to save history" });
    }
  });

  // 📜 Get all predictions for logged-in user
router.get("/history", protectRoute, async (req, res) => {
  try {
    console.log("request came successfully ...");
    const history = await PredictionHistory.find({
      userId: req.user._id,
      userType: req.userType
    })
      .sort({ timestamp: -1 }) // latest first
      .lean();

    res.status(200).json({ success: true, data: history });
  } catch (err) {
    console.error("❌ Error fetching history:", err);
    res.status(500).json({ success: false, message: "Failed to fetch history" });
  }
});

  

export default router;
