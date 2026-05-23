export interface CityInfo {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface CityInfo {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export async function searchCitiesAsync(query: string): Promise<CityInfo[]> {
  if (!query || query.trim().length < 2) return [];
  try {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
    const data = await res.json();
    if (data && data.results) {
      return data.results.map((r: any) => ({
        name: r.name,
        country: r.country || r.admin1 || 'Unknown',
        latitude: r.latitude,
        longitude: r.longitude,
        timezone: r.timezone || 'UTC'
      }));
    }
  } catch (error) {
    console.error("Geocoding error:", error);
  }
  return [];
}
