const BASE_URL = "http://localhost:8081/api/feedbacks";

export const getApprovedFeedbacks = async () => {
  const res = await fetch(`${BASE_URL}/approved`);
  if (!res.ok) throw new Error("Failed to fetch approved feedbacks");
  return res.json();
};

export const getAllFeedbacks = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch feedbacks");
  return res.json();
};

export const getFeedbacksByUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/user/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user feedbacks");
  return res.json();
};

export const createFeedback = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create feedback");
  return res.json();
};

export const updateFeedback = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update feedback");
  return res.json();
};

export const deleteFeedback = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete feedback");
};

export const approveFeedback = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/approve`, { method: "PATCH" });
  if (!res.ok) throw new Error("Failed to approve feedback");
  return res.json();
};
