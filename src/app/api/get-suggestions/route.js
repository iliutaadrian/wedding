/**
 * @file route.js
 * @description API endpoint to retrieve the list of suggested songs from the local JSON file.
 */

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "suggestions.json");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    const fileData = fs.readFileSync(filePath, "utf-8");
    const suggestions = JSON.parse(fileData);

    // Sort by newest first (optional, but good for UX)
    suggestions.reverse();

    return NextResponse.json({ items: suggestions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return NextResponse.json(
      { error: "Failed to fetch suggestions" },
      { status: 500 }
    );
  }
}
