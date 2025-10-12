await fetch('/api/pill/manual', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: medicineName })
});


3️⃣ Frontend usage idea

After upload, store imageId in frontend state.

Poll /api/pill/status/:id every few seconds (or on page refresh).

Show:

✅ “Confirmed” if label exists.

⏳ “Pending” if not labeled yet.

Later, when we integrate AI, this same route will also return:

OCR extracted text

Model’s top predictions

So the frontend flow stays consistent.


3️⃣ Optional — Export to CSV

If you want to download this dataset as a .csv file for easier inspection:

import { Parser } from "json2csv";
const json2csv = new Parser();
const csv = json2csv.parse(exportData);
res.header("Content-Type", "text/csv");
res.attachment("pill_dataset.csv");
res.send(csv);


We can add this later when you’re ready for actual dataset downloads.