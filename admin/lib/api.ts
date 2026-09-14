const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000";

export async function api(
  path: string,
  options: RequestInit = {}
) {

  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
}
