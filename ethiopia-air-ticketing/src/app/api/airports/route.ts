import { NextResponse } from "next/server";

type Airport = { code: string; city: string; country: string };

async function fetchAndParseAirports(): Promise<Airport[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

  const response = await fetch(
    "https://cdn.jsdelivr.net/gh/jpatokal/openflights@master/data/airports.dat",
    { signal: controller.signal }
  );
  clearTimeout(timeout);

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const text = await response.text();

  return text
    .split("\n")
    .filter(line => line.includes(","))
    .map(line => {
      const parts = line.split(",").map(p => p.replace(/"/g, ""));
      return {
        code: parts[4]?.trim() ?? "",
        city: parts[2]?.trim() ?? "",
        country: parts[3]?.trim() ?? "",
        type: parts[12]?.trim() ?? "",
      };
    })
    .filter(a => a.code.length === 3 && a.city && a.country && a.type === "airport")
    .map(({ code, city, country }) => ({ code, city, country }))
    .sort((a, b) => a.city.localeCompare(b.city));
}

let cache: { data: Airport[]; timestamp: number } | null = null;

export async function GET() {
  const now = Date.now();
  const CACHE_MS = 1000 * 60 * 60 * 24;

  if (cache && now - cache.timestamp < CACHE_MS) {
    return NextResponse.json(cache.data);
  }

  try {
    const airports = await fetchAndParseAirports();
    cache = { data: airports, timestamp: now };
    return NextResponse.json(airports);
  } catch (error: unknown) {
    console.error("Airports fetch failed:", (error as Error).message);
    return NextResponse.json(
      { error: "Could not load airports. Please try again later." },
      { status: 500 }
    );
  }
}