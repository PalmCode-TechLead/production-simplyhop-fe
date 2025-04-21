import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const originLat = searchParams.get("originLat");
  const originLng = searchParams.get("originLng");
  const destLat = searchParams.get("destLat");
  const destLng = searchParams.get("destLng");

  if (!originLat || !originLng || !destLat || !destLng) {
    return NextResponse.json(
      { error: "Missing required coordinates" },
      { status: 400 }
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Google Maps API key is missing" },
      { status: 500 }
    );
  }

  const baseUrl = "https://maps.googleapis.com/maps/api/distancematrix/json";
  const params = new URLSearchParams({
    origins: `${originLat},${originLng}`,
    destinations: `${destLat},${destLng}`,
    departure_time: "now",
    key: apiKey,
  });

  const url = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      return NextResponse.json(
        { error: `Google API error: ${data.status}` },
        { status: 500 }
      );
    }

    const element = data.rows[0]?.elements[0];
    if (element.status !== "OK") {
      return NextResponse.json(
        { error: `Route error: ${element.status}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      distance: element.distance,
      duration: element.duration,
      duration_in_traffic: element.duration_in_traffic ?? null,
    });
  } catch (error) {
    console.error("Distance API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
