import React, { useRef, useState, useEffect } from "react";
// Assuming fetchMetricsData is still defined for possible future use or cleanup.
import {
  predictMedicineFromImage,
  predictMedicineFromText,
  fetchMetricsData,
} from "../lib/api";
import {
  Camera,
  CheckCircle,
  Pill,
  AlertTriangle,
  Download,
  Share2,
  RefreshCw,
  Info,
  ChevronDown,
  ChevronUp,
  Package,
  ShieldAlert,
  Activity,
  Bot,
  MessageSquareText,
  BarChart,
  Clock,
  Zap,
  Target,
} from "lucide-react";

// --- Configuration ---
// Assuming your metrics dashboard runs on port 8502 (the default for the second Streamlit app)
const METRICS_DASHBOARD_URL = "http://localhost:8502";
const LOW_DQR_THRESHOLD = 0.5;

// Helper function to format metric values
const formatMetric = (value, type = "number") => {
  if (type === "percent") return `${value.toFixed(1)} %`;
  if (type === "time") return `${value.toFixed(2)} s`;
  if (type === "dqr") return `${value.toFixed(2)}`;
  return value.toLocaleString();
};

// Component to display a single metric (KPI Box) - KEPT FOR REFERENCE, NOT USED IN FINAL UI
const MetricBox = ({ title, value, unit, delta, deltaColor = "normal" }) => {
  // ... (MetricBox logic remains the same, but it is not rendered in the final component)
};

// Collapsible Section Component (Code remains the same)
const Section = ({ title, icon, data, expanded, toggle }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
    <button
      onClick={toggle}
      className="w-full p-6 flex items-center justify-between hover:bg-gray-700/30 transition-colors"
    >
      <div className="flex items-center">
        {icon}
        <h3 className="text-xl font-semibold text-white ml-3">{title}</h3>
      </div>
      {expanded ? (
        <ChevronUp className="h-5 w-5 text-gray-400" />
      ) : (
        <ChevronDown className="h-5 w-5 text-gray-400" />
      )}
    </button>
    {expanded && (
      <div className="px-6 pb-6">
        <ul className="space-y-2">
          {data.length > 0 ? (
            data.map((item, idx) => (
              <li key={idx} className="flex items-start text-gray-300">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-400 italic">No data available</li>
          )}
        </ul>
      </div>
    )}
  </div>
);

const MedicinePage = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [scanId, setScanId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [manualQuery, setManualQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    uses: true,
    sideEffects: true,
    precautions: false,
    interactions: false,
  });

  // Removed metrics state and useEffect for simplicity, as we are linking to the external Streamlit dashboard now.

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setScanId(null);
    }
  };

  const handleChooseFile = () => fileInputRef.current.click();

  const handleUpload = async () => {
    if (!file) return alert("Please select an image first!");
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await predictMedicineFromImage(formData);

      if (res.success) {
        setResult(res.result || res.data);
        const idFromBackend = res.scan_id || "temp_" + Date.now();
        setScanId(idFromBackend);
      } else {
        alert("No medicine detected. Try again.");
      }
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert("Failed to process image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualSearch = async () => {
    if (!manualQuery.trim()) return alert("Please enter a medicine name.");
    setLoading(true);
    setResult(null);
    setScanId(null);

    try {
      const res = await predictMedicineFromText(manualQuery);
      if (res.success) {
        setResult(res.result || res.data);
        const manualId = res.scan_id || "manual_search_" + Date.now();
        setScanId(manualId);
      } else {
        alert("No matching medicine found.");
      }
    } catch (err) {
      console.error("❌ Manual search failed:", err);
      alert("Failed to fetch medicine details.");
    } finally {
      setLoading(false);
    }
  };

  // Function to open Streamlit Chatbot (Code remains the same)
  const handleOpenChatbot = () => {
    const userId = localStorage.getItem("user_id") || "guest_user";
    let chatUrl = `http://localhost:8501/?user_id=${userId}`;

    if (scanId) {
      chatUrl += `&scan_id=${scanId}`;
    }

    window.open(chatUrl, "_blank");
  };

  // NEW: Function to open Streamlit Metrics Dashboard
  const handleOpenMetricsDashboard = () => {
    window.open(METRICS_DASHBOARD_URL, "_blank");
  };

  const handleDownloadPDF = () => alert("📄 PDF download feature coming soon!");
  const handleShare = () => alert("🔗 Share feature coming soon!");
  const handleViewAnother = () => {
    setResult(null);
    setFile(null);
    setManualQuery("");
    setScanId(null);
  };

  const LoadingSkeleton = () => (
    <div className="mt-10 space-y-4 animate-pulse">
      <div className="h-32 bg-gray-700/50 rounded-2xl"></div>
      <div className="h-48 bg-gray-700/50 rounded-2xl"></div>
      <div className="h-64 bg-gray-700/50 rounded-2xl"></div>
    </div>
  );

  const listify = (data) =>
    Array.isArray(data)
      ? data
      : typeof data === "string"
      ? data.split(",").map((s) => s.trim())
      : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-8 md:p-8 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="bg-blue-500/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-400/30">
            <Pill className="h-10 w-10 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Medicine Identification
          </h1>
          <p className="text-xl text-gray-300">
            Upload a photo or enter a name to identify medication instantly
          </p>
        </div>

        {/* Upload & Search Section (Code remains the same) */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-gray-700 shadow-2xl">
          {/* Image Upload/Preview (Code remains the same) */}
          <div className="border-4 border-dashed border-gray-600 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors duration-300">
            {file ? (
              // ... (File preview and Upload buttons)
              <>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="mx-auto mb-6 max-h-60 rounded-xl shadow-lg"
                />
                <p className="text-sm text-gray-300 mb-4">
                  Selected file:{" "}
                  <span className="text-blue-400">{file.name}</span>
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-green-700 font-semibold disabled:opacity-50 flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-5 w-5 mr-2 animate-spin" />{" "}
                        Processing...
                      </>
                    ) : (
                      "Upload & Analyze"
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setFile(null);
                      setResult(null);
                      setScanId(null);
                    }}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl hover:from-red-600 hover:to-red-700 font-semibold flex items-center justify-center"
                  >
                    <Camera className="h-5 w-5 mr-2" /> Retake Photo
                  </button>
                </div>
              </>
            ) : (
              // ... (Choose File button)
              <>
                <Camera className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Upload Medicine Photo
                </h3>
                <p className="text-gray-400 mb-6">
                  Drag & drop your image or click to upload
                </p>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  onClick={handleChooseFile}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 font-semibold inline-flex items-center"
                >
                  <Package className="h-5 w-5 mr-2" /> Choose File
                </button>
              </>
            )}
          </div>

          {/* Manual Search (Code remains the same) */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-3">or search manually</p>
            <div className="flex flex-col sm:flex-row justify-center gap-2">
              <input
                type="text"
                value={manualQuery}
                onChange={(e) => setManualQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleManualSearch()}
                placeholder="Enter medicine name..."
                className="px-4 py-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              />
              <button
                onClick={handleManualSearch}
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 font-semibold disabled:opacity-50"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>

          {loading && <LoadingSkeleton />}

          {/* Result Section (Code remains the same) */}
          {result && !loading && (
            <div className="mt-10 space-y-6 animate-fadeIn">
              {/* Header Card (Code remains the same) */}
              <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/30 shadow-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {result.medicine_name ||
                    result.brand_name ||
                    "Unknown Medicine"}
                </h2>
                <p className="text-xl text-gray-300 mb-4">
                  Generic:{" "}
                  <span className="text-blue-300">{result.generic_name}</span>
                </p>
              </div>

              {/* Uses / Side Effects / Precautions / Interactions (Code remains the same) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Section
                  title="Medical Uses"
                  icon={<Activity className="h-6 w-6 text-green-400" />}
                  data={listify(result.uses)}
                  expanded={expandedSections.uses}
                  toggle={() => toggleSection("uses")}
                />
                <Section
                  title="Side Effects"
                  icon={<AlertTriangle className="h-6 w-6 text-yellow-400" />}
                  data={listify(result.side_effects)}
                  expanded={expandedSections.sideEffects}
                  toggle={() => toggleSection("sideEffects")}
                />
                <Section
                  title="Precautions"
                  icon={<ShieldAlert className="h-6 w-6 text-red-400" />}
                  data={listify(result.precautions)}
                  expanded={expandedSections.precautions}
                  toggle={() => toggleSection("precautions")}
                />
                <Section
                  title="Drug Interactions"
                  icon={<Info className="h-6 w-6 text-orange-400" />}
                  data={listify(result.drug_interactions)}
                  expanded={expandedSections.interactions}
                  toggle={() => toggleSection("interactions")}
                />
              </div>

              {/* Alternatives (Code remains the same) */}
              {result.alternatives?.length > 0 && (
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Alternatives
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {result.alternatives?.map((alt, i) => (
                      <span
                        key={i}
                        className="bg-blue-600/30 text-blue-300 px-4 py-2 rounded-xl border border-blue-500/40"
                      >
                        {alt.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Chatbot Button */}
                {scanId && (
                  <button
                    onClick={handleOpenChatbot}
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-teal-600 hover:to-emerald-700 font-semibold flex items-center justify-center shadow-lg transform hover:scale-[1.01] transition-all"
                  >
                    <Bot className="h-6 w-6 mr-2" />
                    Chat with AI Assistant about this Medicine
                  </button>
                )}

                {/* NEW: Metrics Dashboard Button */}
                <button
                  onClick={handleOpenMetricsDashboard}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-yellow-600 hover:to-orange-700 font-semibold flex items-center justify-center shadow-lg transform hover:scale-[1.01] transition-all"
                >
                  <BarChart className="h-6 w-6 mr-2" />
                  View Pipeline Performance Metrics
                </button>

                <button
                  onClick={handleDownloadPDF}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-purple-700 font-semibold flex items-center justify-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF
                </button>

                <button
                  onClick={handleShare}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 font-semibold flex items-center justify-center"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </button>

                <button
                  onClick={handleViewAnother}
                  className="w-full bg-gray-700 text-white px-6 py-3 rounded-xl hover:bg-gray-600 font-semibold flex items-center justify-center"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  View Another Medicine
                </button>
              </div>
            </div>
          )}
        </div>

        {/* NOTE: The dedicated ML Pipeline Metrics Section was removed here, 
                   as we are now linking to the external Streamlit page. */}
      </div>

      {/* Floating Action Button (FAB) for Chat (Code remains the same) */}
      {result && scanId && (
        <button
          onClick={handleOpenChatbot}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl border-2 border-blue-400/50 animate-bounce hover:animate-none transition-all z-50"
          title="Chat about this medicine"
        >
          <MessageSquareText className="h-8 w-8" />
        </button>
      )}
    </div>
  );
};

export default MedicinePage;
