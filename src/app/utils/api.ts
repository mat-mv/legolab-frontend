export async function fetchData(endpoint: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.legolab-karlsruhe.de/api/";

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, { next: { tags: ['revalidate'] } });

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
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.legolab-karlsruhe.de/api/";
  console.log(data);
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
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
