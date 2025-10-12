import mongoose from "mongoose";
const { Schema } = mongoose;

const LabelSchema = new Schema(
  {
    label: String,
    generic_name: String,
    dose_mg: Number,
    labeled_by: { type: Schema.Types.ObjectId },
    labeled_by_type: { type: String, enum: ["User", "GUser"] },
    labeled_at: Date,
  },
  { _id: false }
);

const PillImageSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId },
  user_type: { type: String, enum: ["User", "GUser"] },
  filename: String,
  original_name: String,
  path: String,
  content_type: String,
  size: Number,
  uploaded_at: { type: Date, default: Date.now },
  consent_to_store: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["pending", "labeled", "confirmed", "deleted"],
    default: "pending",
  },
  ocr_text: String,
  vision_candidates: [{ label: String, score: Number }],
  confirmed_label: LabelSchema,
});

const PillImage = mongoose.model("PillImage", PillImageSchema);
export default PillImage;
