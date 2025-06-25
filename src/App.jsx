import React, { useEffect, useState } from "react";
import MemeGallery from "./MemeGallery";
import UploadMeme from "./UploadMeme";
import Toast from "./Toast";

const CATEGORIES = [
  "All",
  "Funny",
  "Reaction",
  "Animals",
  "Gaming",
  "Movies",
  "Other",
];

const SAMPLE_MEMES = [
  { id: "sample1", src: "/memes/meme1.jpg", name: "Meme 1", category: "Funny" },
  { id: "sample2", src: "/memes/meme2.jpg", name: "Meme 2", category: "Reaction" },
  { id: "sample3", src: "/memes/meme3.jpg", name: "Meme 3", category: "Animals" },
  { id: "sample4", src: "/memes/meme4.jpg", name: "Meme 4", category: "Gaming" },
  { id: "sample5", src: "/memes/meme5.jpg", name: "Meme 5", category: "Movies" },
  { id: "sample6", src: "/memes/meme6.jpg", name: "Meme 6", category: "Funny" },
];

function getStoredMemes() {
  const stored = localStorage.getItem("uploadedMemes");
  return stored ? JSON.parse(stored) : [];
}

function getStoredLikes() {
  const stored = localStorage.getItem("memeLikes");
  return stored ? JSON.parse(stored) : {};
}

function App() {
  const [memes, setMemes] = useState([]);
  const [likes, setLikes] = useState({});
  const [toast, setToast] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    setMemes([...SAMPLE_MEMES, ...getStoredMemes()]);
    setLikes(getStoredLikes());
  }, []);

  const handleLike = (id) => {
    setLikes((prev) => {
      const updated = { ...prev, [id]: prev[id] ? 0 : 1 };
      localStorage.setItem("memeLikes", JSON.stringify(updated));
      return updated;
    });
  };

  const handleUpload = (file, previewUrl, memeName, memeDescription, category) => {
    const id = "user-" + Date.now();
    const newMeme = {
      id,
      src: previewUrl,
      name: memeName || file.name,
      description: memeDescription || "",
      category: category || "Other",
    };
    const updatedMemes = [...memes, newMeme];
    setMemes(updatedMemes);
    localStorage.setItem(
      "uploadedMemes",
      JSON.stringify(updatedMemes.filter((m) => m.id.startsWith("user-")))
    );
    setToast("Meme uploaded!");
    setTimeout(() => setToast(""), 2000);
  };

  // Filter and sort memes
  const filteredMemes =
    activeCategory === "All"
      ? [...memes]
      : memes.filter((meme) => meme.category === activeCategory);

  const sortedMemes = filteredMemes.sort(
    (a, b) => (likes[b.id] || 0) - (likes[a.id] || 0)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white">
      <header className="bg-black/30 backdrop-blur-sm shadow-lg p-6 flex flex-col md:flex-row items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <svg
            className="w-10 h-10 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Crazy explosion background */}
            <path
              d="M12 2L15 6L19 4L17 8L21 10L17 12L19 16L15 14L12 18L9 14L5 16L7 12L3 10L7 8L5 4L9 6L12 2Z"
              fill="#FF3D71"
            />
            {/* Face base */}
            <circle cx="12" cy="12" r="7" fill="#FFD600" />
            {/* Left crazy eye */}
            <ellipse
              cx="9"
              cy="10"
              rx="1.5"
              ry="2.5"
              transform="rotate(-15 9 10)"
              fill="black"
            />
            <ellipse cx="9.2" cy="9.5" rx="0.6" ry="0.8" fill="white" />
            {/* Right crazy eye */}
            <ellipse
              cx="15"
              cy="10"
              rx="1.5"
              ry="2.5"
              transform="rotate(15 15 10)"
              fill="black"
            />
            <ellipse cx="14.8" cy="9.5" rx="0.6" ry="0.8" fill="white" />
            {/* Crazy mouth */}
            <path
              d="M8 13.5C9.5 16.5 14.5 16.5 16 13.5"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M7.5 13.5C10.5 13 13.5 13 16.5 13.5"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Tongue */}
            <path
              d="M11 15C11.8333 16 12.6667 16 13.5 15"
              fill="#FF5757"
            />
            {/* Wacky details */}
            <path
              d="M3 7L4 5M21 7L20 5M4 17L3 19M20 17L21 19"
              stroke="#9333EA"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="4" r="0.5" fill="#9333EA" />
            <circle cx="20" cy="12" r="0.5" fill="#9333EA" />
            <circle cx="12" cy="20" r="0.5" fill="#9333EA" />
            <circle cx="4" cy="12" r="0.5" fill="#9333EA" />
          </svg>
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            MemeVerse
          </h1>
        </div>
        <UploadMeme onUpload={handleUpload} categories={CATEGORIES.filter(c => c !== "All")} />
      </header>
      
      <div className="container mx-auto px-6 pt-6">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6 overflow-x-auto pb-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium"
                  : "bg-black/20 backdrop-blur-sm text-white hover:bg-black/40"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {sortedMemes.length === 0 ? (
          <div className="text-center py-12 text-gray-300">
            <p className="text-xl">No memes found in this category</p>
            <p className="mt-2">Upload a new one or select a different category</p>
          </div>
        ) : (
          <MemeGallery memes={sortedMemes} likes={likes} onLike={handleLike} />
        )}
      </div>
      <Toast message={toast} />
    </div>
  );
}

export default App;