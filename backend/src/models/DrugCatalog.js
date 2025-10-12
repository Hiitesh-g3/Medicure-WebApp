import mongoose from "mongoose";
const { Schema } = mongoose;

const PriceSchema = new Schema(
  {
    vendor: String,
    price_inr: Number,
    url: String,
  },
  { _id: false }
);

const DrugCatalogSchema = new Schema({
  brand_name: { type: String, index: true },
  generic_name: { type: String, index: true },
  active_ingredients: [{ name: String, amount_mg: Number }],
  form: String,
  description: String,
  side_effects: [String],
  imprint_texts: [String],
  price_list: [PriceSchema],
  createdAt: { type: Date, default: Date.now },
});

const DrugCatalog = mongoose.model("DrugCatalog", DrugCatalogSchema);
export default DrugCatalog;
