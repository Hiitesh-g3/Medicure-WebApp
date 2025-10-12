// seedDrugCatalog.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DrugCatalogSchema = new mongoose.Schema({
  brand_name: String,
  generic_name: String,
  description: String,
  side_effects: [String],
  form: String,
  active_ingredients: [
    { name: String, amount_mg: Number }
  ],
  price_list: [
    { vendor: String, price_inr: Number }
  ]
});

const DrugCatalog = mongoose.model("DrugCatalog", DrugCatalogSchema);

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await DrugCatalog.insertMany([
    {
      brand_name: "Calpol",
      generic_name: "Paracetamol",
      description: "Used to relieve fever and mild pain.",
      side_effects: ["Nausea", "Rash", "Liver irritation"],
      form: "Tablet",
      active_ingredients: [{ name: "Paracetamol", amount_mg: 500 }],
      price_list: [{ vendor: "Jan Aushadhi", price_inr: 6 }]
    },
    {
      brand_name: "Combiflam",
      generic_name: "Ibuprofen + Paracetamol",
      description: "Used for pain and inflammation relief.",
      side_effects: ["Heartburn", "Dizziness"],
      form: "Tablet",
      active_ingredients: [
        { name: "Ibuprofen", amount_mg: 400 },
        { name: "Paracetamol", amount_mg: 325 }
      ],
      price_list: [{ vendor: "Jan Aushadhi", price_inr: 12 }]
    }
  ]);

  console.log("✅ DrugCatalog seeded successfully!");
  mongoose.connection.close();
}

seed();
