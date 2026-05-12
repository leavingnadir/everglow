import { useEffect, useState } from "react";
import { getApprovedFeedbacks } from "../api/feedbackApi";
import FeedbackCard from "../components/FeedbackCard";

export default function FeedbackPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getApprovedFeedbacks().then(setData);
  }, []);

  return (
    <div>
      <h2>Approved Reviews</h2>
      {data.map((f) => (
        <FeedbackCard key={f.id} feedback={f} />
      ))}
    </div>
  );
}