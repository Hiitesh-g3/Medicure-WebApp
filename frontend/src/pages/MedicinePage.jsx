import { Camera, CheckCircle, Pill } from "lucide-react";
import React, { useRef, useState } from "react";

const MedicinePage = () => {
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
      alert(`Uploading: ${file.name}`);
    }
  };

  const handleRetake = () => {
    setFile(null);
    fileInputRef.current.click(); // immediately open file picker again
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="bg-blue-500/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Pill className="h-10 w-10 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Medicine Identification
          </h1>
          <p className="text-xl text-gray-300">
            Upload a photo to identify any medication instantly
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
          <div className="border-4 border-dashed border-gray-600 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors duration-300">
            {file ? (
              <>
                {/* Image Preview */}
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="mx-auto mb-6 max-h-60 rounded-xl shadow-lg"
                />
                <p className="text-sm text-gray-300 mb-4">
                  Selected file: <span className="text-blue-400">{file.name}</span>
                </p>

                {/* Upload + Retake Buttons */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleUpload}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold"
                  >
                    Upload
                  </button>
                  <button
                    onClick={handleRetake}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold"
                  >
                    Retake Photo
                  </button>
                </div>
              </>
            ) : (
              <>
                <Camera className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Upload Medicine Photo
                </h3>
                <p className="text-gray-400 mb-6">
                  Drag and drop your image here, or click to browse
                </p>

                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  onClick={handleChooseFile}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold"
                >
                  Choose File
                </button>
              </>
            )}
          </div>

          <div className="mt-8 p-6 bg-gray-700/30 rounded-2xl">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              What you'll get:
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
              <div>• Medicine name & brand</div>
              <div>• Dosage information</div>
              <div>• Usage instructions</div>
              <div>• Side effects</div>
              <div>• Safety warnings</div>
              <div>• Storage guidelines</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicinePage;
