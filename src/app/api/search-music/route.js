import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  // Ensure a search query is provided
  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "YouTube API key is missing" },
      { status: 500 }
    );
  }

  try {
    // Build the YouTube search URL
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(
      query
    )}&key=${apiKey}`;

    // Make the request to YouTube's API
    const response = await fetch(searchUrl);

    // Handle errors during the request
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error searching YouTube:", errorData);
      return NextResponse.json(
        { error: "Failed to search tracks", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Map YouTube results to a unified structure
    const mappedItems = data.items.map((item) => ({
      id: item.id.videoId,
      name: item.snippet.title,
      artist: item.snippet.channelTitle,
      image: item.snippet.thumbnails.default.url,
      uri: item.id.videoId, // Use videoId as the URI/identifier
    }));

    return NextResponse.json({ items: mappedItems }, { status: 200 });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error fetching tracks:", error);
    return NextResponse.json(
      { error: "Failed to search tracks", details: error.message },
      { status: 500 }
    );
  }
}
