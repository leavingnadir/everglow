export default function StarRating({ rating }) {
  return (
    <div>
      {[1,2,3,4,5].map((i) => (
        <span key={i} style={{ color: i <= rating ? "gold" : "#ccc" }}>
          ★
        </span>
      ))}
    </div>
  );
}