import { FileText, Upload } from "lucide-react";
import React, { useRef, useState } from "react";

const ReportScannerPage = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    if (file) {
      // 🚀 later integrate API upload here
      alert(`Uploading report: ${file.name}`);
    }
  };

  const handleRetake = () => {
    setFile(null);
    fileInputRef.current.click(); // reopen file picker
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-green-900 p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="bg-green-500/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FileText className="h-10 w-10 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Report Scanner & Simplifier
          </h1>
          <p className="text-xl text-gray-300">
            Get easy explanations of your medical reports
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
          <div className="border-4 border-dashed border-gray-600 rounded-2xl p-12 text-center hover:border-green-400 transition-colors duration-300">
            {file ? (
              <>
                {/* File name */}
                <p className="text-sm text-gray-300 mb-6">
                  Selected file:{" "}
                  <span className="text-green-400 font-medium">
                    {file.name}
                  </span>
                </p>

                {/* Buttons */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleUpload}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold"
                  >
                    Upload Report
                  </button>
                  <button
                    onClick={handleRetake}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold"
                  >
                    Retake Report
                  </button>
                </div>
              </>
            ) : (
              <>
                <Upload className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Upload Medical Report
                </h3>
                <p className="text-gray-400 mb-6">
                  Supports PDF, JPG, PNG formats
                </p>

                {/* Hidden file input */}
                <input
                  type="file"
                  accept=".pdf, image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  onClick={handleChooseFile}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold"
                >
                  Choose File
                </button>
              </>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 bg-gray-700/30 rounded-2xl">
              <h4 className="text-lg font-semibold text-white mb-4">
                ✨ Key Features
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>• Highlighted abnormal values</div>
                <div>• Plain English explanations</div>
                <div>• Trend analysis</div>
                <div>• Recommendations</div>
              </div>
            </div>
            <div className="p-6 bg-gray-700/30 rounded-2xl">
              <h4 className="text-lg font-semibold text-white mb-4">
                📋 Supported Reports
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>• Blood tests</div>
                <div>• X-rays & scans</div>
                <div>• Lab results</div>
                <div>• Prescription summaries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportScannerPage;
