import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchPredictionHistory } from "../lib/api";

const MyHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetchPredictionHistory();
        console.log(res.data);
        setHistory(res.data);
      } catch (err) {
        console.error("❌ Failed to load history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  console.log(history);

  if (loading) return <p className="text-center mt-5 text-gray-500">Loading history...</p>;

  if (history.length === 0) return <p className="text-center mt-5 text-gray-500">No history found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center">🧠 My Medicine History</h2>

      <div className="space-y-4">
        {history.map((item) => (
          <div key={item._id} className="p-4 border rounded-lg shadow-sm hover:shadow-md bg-white">
            <p><strong>Medicine:</strong> {item.detectedMedicine || "N/A"}</p>
            <p><strong>Generic Name:</strong> {item.genericName || "N/A"}</p>
            <p><strong>Input Type:</strong> {item.inputType}</p>
            <p><strong>Date:</strong> {new Date(item.timestamp).toLocaleString()}</p>

            {item.inputType === "image" && (
              <img
                src={`http://localhost:3001/uploads/${item.inputValue}`}
                alt="Medicine"
                className="w-32 mt-2 rounded"
              />
            )}

            <details className="mt-2">
              <summary className="cursor-pointer text-blue-600">View Alternatives</summary>
              <ul className="mt-2 list-disc list-inside text-sm">
                {item.result?.alternatives?.map((alt, i) => (
                  <li key={i}>
                    {alt.name} — {alt.price_jan_aushadhi} (MRP {alt.price_mrp})
                  </li>
                ))}
              </ul>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHistory;
