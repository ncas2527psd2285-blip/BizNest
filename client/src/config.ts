const API_BASE_URL =
  import.meta.env.VITE_API_URL?.trim() ||
  "http://localhost:5000";

export const API_URL =
  `${API_BASE_URL}/api`;

export const PUBLIC_API_URL =
  API_BASE_URL;