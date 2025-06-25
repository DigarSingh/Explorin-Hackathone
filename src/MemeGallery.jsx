import React from "react";
import MemeCard from "./MemeCard";

function MemeGallery({ memes, likes, onLike }) {
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {memes.map((meme) => (
        <MemeCard
          key={meme.id}
          meme={meme}
          liked={!!likes[meme.id]}
          likeCount={likes[meme.id] || 0}
          onLike={() => onLike(meme.id)}
        />
      ))}
    </div>
  );
}

export default MemeGallery;
