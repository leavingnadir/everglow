import { useState } from "react";

// Pass onRate to make it interactive; omit for display-only
export default function StarRating({ rating, onRate, size = 20 }) {
  const [hovered, setHovered] = useState(0);
  const interactive = !!onRate;
  const filled = hovered || rating;

  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          onClick={() => interactive && onRate(i)}
          onMouseEnter={() => interactive && setHovered(i)}
          onMouseLeave={() => interactive && setHovered(0)}
          style={{
            fontSize: size,
            color: i <= filled ? "#C9A84C" : "#DDD6CE",
            cursor: interactive ? "pointer" : "default",
            transition: "color 0.12s, transform 0.1s",
            display: "inline-block",
            transform: interactive && hovered === i ? "scale(1.25)" : "scale(1)",
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
