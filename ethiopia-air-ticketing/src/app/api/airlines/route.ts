import { NextResponse } from "next/server";

type Airline = { code: string; name: string; logo: string };

function logoUrl(iata: string) {
  // Use backticks to evaluate the variable, not single quotes
  return `https://content.airhex.com/content/logos/airlines_${iata}_100_50_r.png`;
}

async function fetchAndParseAirlines(): Promise<Airline[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  const response = await fetch(
    "https://cdn.jsdelivr.net/gh/jpatokal/openflights@master/data/airlines.dat",
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
        code: parts[3]?.trim() ?? "",
        name: parts[1]?.trim() ?? "",
        active: parts[7]?.trim() === "Y",
      };
    })
    .filter(a => a.code.length === 2 && a.active)
    .map(a => ({
      code: a.code,
      name: a.name,
      logo: logoUrl(a.code),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

let cache: { data: Airline[]; timestamp: number } | null = null;

export async function GET() {
  const now = Date.now();
  const CACHE_MS = 1000 * 60 * 60 * 24;

  if (cache && now - cache.timestamp < CACHE_MS) {
    return NextResponse.json(cache.data);
  }

  try {
    const airlines = await fetchAndParseAirlines();
    cache = { data: airlines, timestamp: now };
    return NextResponse.json(airlines);
  } catch (error: unknown) {
    console.error("Airlines fetch failed:", (error as Error).message);
    return NextResponse.json(
      { error: "Could not load airlines. Please try again later." },
      { status: 500 }
    );
  }
}