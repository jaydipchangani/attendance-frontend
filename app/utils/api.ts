export const API_BASE = "http://localhost:3000/"; 

export const fetcher = async (endpoint: string, token?: string) => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: token
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      : { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "API Error");
  return data;
};
