// lib/api.ts
export async function fetchData<T>(endpoint: string): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.legolab-karlsruhe.de/api/";

  try {
    const response = await fetch(`${baseUrl}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Fehler beim Abrufen der Daten: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API-Fehler:", error);
    throw error;
  }
}
