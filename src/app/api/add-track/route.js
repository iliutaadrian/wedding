import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    // Parse the request
    const body = await req.json();
    const { trackUri, trackName, artist, image } = body;

    // Validate
    if (!trackUri) {
      return NextResponse.json(
        { error: "trackUri (videoId) is required" },
        { status: 400 }
      );
    }

    const suggestion = {
      id: trackUri,
      name: trackName || "Unknown Title",
      artist: artist || "Unknown Artist",
      image: image || null,
      addedAt: new Date().toISOString(),
    };

    // Define file path
    const filePath = path.join(process.cwd(), "suggestions.json");

    // Read existing data
    let suggestions = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      try {
        suggestions = JSON.parse(fileData);
      } catch (e) {
        console.error("Error parsing suggestions file", e);
      }
    }

    // Check if already exists
    if (suggestions.some((s) => s.id === trackUri)) {
      return NextResponse.json({ message: "Track already suggested" });
    }

    // Append
    suggestions.push(suggestion);

    // Write back
    fs.writeFileSync(filePath, JSON.stringify(suggestions, null, 2));

    return NextResponse.json({ message: "Track added successfully!" });
  } catch (error) {
    console.error("Error adding track:", error.message);
    return NextResponse.json(
      { error: "Error adding track", details: error.message },
      { status: 500 }
    );
  }
}
