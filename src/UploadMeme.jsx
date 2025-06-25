import React, { useRef, useState } from "react";

function UploadMeme({ onUpload, categories = [] }) {
  const fileInput = useRef();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [memeName, setMemeName] = useState("");
  const [memeDescription, setMemeDescription] = useState("");
  const [category, setCategory] = useState(categories[0] || "Other");
  const [showForm, setShowForm] = useState(false);

  const handleFile = (f) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      setFile(f);
      setShowForm(true);
      setMemeName(f.name.replace(/\.[^/.]+$/, "")); // Remove extension as default name
    };
    reader.readAsDataURL(f);
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = () => {
    if (file && preview) {
      onUpload(file, preview, memeName, memeDescription, category);
      setPreview(null);
      setFile(null);
      setMemeName("");
      setMemeDescription("");
      setCategory(categories[0] || "Other");
      setShowForm(false);
    }
  };

  return (
    <>
      <button
        className={`bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg transform transition hover:scale-105 flex items-center ${
          showForm ? "invisible" : "visible"
        }`}
        onClick={() => fileInput.current.click()}
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Upload Meme
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          className="hidden"
          onChange={handleChange}
        />
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setShowForm(false)}
          ></div>
          <div className="relative bg-gradient-to-br from-gray-900 to-purple-900 rounded-xl shadow-2xl p-6 w-11/12 max-w-md mx-auto z-50">
            <h3 className="text-2xl font-bold mb-4 text-white text-center">
              Add New Meme
            </h3>

            <div className="flex flex-col items-center mb-6">
              <div className="w-full h-64 mb-4 flex items-center justify-center bg-black/20 rounded-lg overflow-hidden">
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </div>

              <div className="space-y-4 w-full">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Meme Name
                  </label>
                  <input
                    type="text"
                    value={memeName}
                    onChange={(e) => setMemeName(e.target.value)}
                    placeholder="Give your meme a name"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={memeDescription}
                    onChange={(e) => setMemeDescription(e.target.value)}
                    placeholder="Add a short description (optional)"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                className="px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                onClick={() => {
                  setPreview(null);
                  setFile(null);
                  setMemeName("");
                  setMemeDescription("");
                  setCategory(categories[0] || "Other");
                  setShowForm(false);
                }}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-lg transition"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UploadMeme;
