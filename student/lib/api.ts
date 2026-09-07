const API =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function api(path: string) {
  const res = await fetch(`${API}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}
