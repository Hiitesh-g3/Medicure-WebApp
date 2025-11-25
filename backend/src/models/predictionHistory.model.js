import mongoose from "mongoose";

const predictionHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "userType", // can reference both User and GUser
    required: true
  },
  userType: {
    type: String,
    enum: ["User", "GUser"],
    required: true
  },
  inputType: {
    type: String,
    enum: ["text", "image"],
    required: true
  },
  inputValue: {
    type: String,
    required: true
  },
  detectedMedicine: {
    type: String
  },
  genericName: {
    type: String
  },
  result: {
    type: Object
  },
  confidence: {
    type: Number
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const PredictionHistory = mongoose.model("PredictionHistory", predictionHistorySchema);
export default PredictionHistory;
