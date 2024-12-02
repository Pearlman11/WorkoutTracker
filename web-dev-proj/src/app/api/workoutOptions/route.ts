import { NextRequest, NextResponse } from "next/server";

const EXERCISE_DB_URL = "https://exercisedb.p.rapidapi.com";
const RAPIDAPI_HEADERS = {
  "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
  "x-rapidapi-host": "exercisedb.p.rapidapi.com",
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const bodyPart = searchParams.get("bodyPart");

  try {
    let endpoint = `${EXERCISE_DB_URL}/exercises`;

    if (bodyPart) {
      endpoint = `${EXERCISE_DB_URL}/exercises/bodyPart/${bodyPart}`;
    }

    const response = await fetch(endpoint, {
      headers: RAPIDAPI_HEADERS,
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch exercises" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return NextResponse.json({ error: "Error fetching exercises" }, { status: 500 });
  }
}