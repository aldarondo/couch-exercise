const baseApiUrl = process.env.BASE_API_URL;

export default async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const url = `${baseApiUrl}${endpoint}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return res.json();
}
