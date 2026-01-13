/**
 * @file route.js
 * @description API endpoint for searching music on Spotify by track name. Returns search results based on the user's query.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import { NextResponse } from "next/server";
import { getClientAccessToken } from "@/utils/spotifyClient";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  // Ensure a search query is provided
  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  // Get a valid Spotify access token for client-side requests
  const token = await getClientAccessToken();
  if (!token) {
    return NextResponse.json(
      { error: "Unable to get access token" },
      { status: 500 }
    );
  }

  try {
    // Build the Spotify search URL with the provided query
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track&limit=30`;
    // Make the request to Spotify's API to search for tracks
    const response = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Handle errors during the request
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error searching tracks:", errorData);
      return NextResponse.json(
        { error: "Failed to search tracks", details: errorData },
        { status: response.status }
      );
    }

    // Parse and return the search results from Spotify's API
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error fetching tracks:", error);
    return NextResponse.json(
      { error: "Failed to search tracks", details: error.message },
      { status: 500 }
    );
  }
}
