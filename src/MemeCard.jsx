import React, { useState } from "react";

function MemeCard({ meme, liked, likeCount, onLike }) {
  const [expanded, setExpanded] = useState(false);

  // Define category badge colors
  const categoryColors = {
    funny: "bg-yellow-500",
    reaction: "bg-green-500",
    animals: "bg-blue-500",
    gaming: "bg-red-500",
    movies: "bg-purple-500",
    other: "bg-gray-500",
  };

  const badgeColor =
    categoryColors[meme.category?.toLowerCase()] || categoryColors.other;

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform transition hover:scale-105">
      <div className="relative">
        <img
          src={meme.src}
          alt={meme.name}
          className="w-full h-64 object-cover"
        />
        {meme.category && (
          <span
            className={`absolute top-3 right-3 ${badgeColor} text-white text-xs px-2 py-1 rounded-full font-medium`}
          >
            {meme.category}
          </span>
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="p-4 w-full">
            <h3 className="font-bold text-white text-lg truncate">
              {meme.name}
            </h3>
            {meme.description && (
              <p className="text-gray-300 text-sm line-clamp-2">
                {meme.description}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <h3 className="font-bold text-white truncate max-w-[70%]">
          {meme.name}
        </h3>
        <button
          className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
            liked
              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          } transition-all`}
          onClick={onLike}
        >
          <svg
            className={`w-5 h-5`}
            fill={liked ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={liked ? 0 : 2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span>{likeCount}</span>
        </button>
      </div>
      {expanded && meme.description && (
        <div className="px-4 pb-4 -mt-2">
          <p className="text-gray-300 text-sm">{meme.description}</p>
        </div>
      )}
    </div>
  );
}

export default MemeCard;
