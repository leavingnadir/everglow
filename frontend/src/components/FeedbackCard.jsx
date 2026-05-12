import StarRating from "./StarRating";

export default function FeedbackCard({ feedback }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, margin: 10 }}>
      <h4>{feedback.reviewerName}</h4>
      <p>{feedback.comment}</p>
      <StarRating rating={feedback.rating} />
      <small>{feedback.vendorCategory}</small>
    </div>
  );
}