function buildUrl(endpoint: string): string {
  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://www.legolab-karlsruhe.de/api").replace(/\/$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${baseUrl}${path}`;
}

export async function fetchData(endpoint: string) {
  try {
    const response = await fetch(buildUrl(endpoint), { next: { tags: ['revalidate'] } });

    if (!response.ok) {
      throw new Error(`Fehler beim Abrufen der Daten: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API-Fehler:", error);
    throw error;
  }
}

export async function postData(endpoint: string, data: any) {
  try {
    const response = await fetch(buildUrl(endpoint), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    })

    return response.json();

  } catch (error) {
    console.error("API-Fehler:", error);
    throw error;
  }
}