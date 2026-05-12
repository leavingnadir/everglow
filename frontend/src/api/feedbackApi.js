const BASE_URL = "http://localhost:8081/api/feedbacks";

export const getApprovedFeedbacks = async () => {
  const res = await fetch(`${BASE_URL}/approved`);
  return res.json();
};

export const getAllFeedbacks = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createFeedback = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteFeedback = async (id) => {
  return fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};

export const approveFeedback = async (id) => {
  return fetch(`${BASE_URL}/${id}/approve`, { method: "PATCH" });
};