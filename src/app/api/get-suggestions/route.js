import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "suggestions.json");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    const fileData = fs.readFileSync(filePath, "utf-8");

    // Helper to clean JSON string (remove trailing commas)
    const cleanJson = (str) => {
      // Remove trailing comma before the closing bracket of an array
      return str.replace(/,\s*\]/g, "]");
    };

    let suggestions = [];
    try {
      const cleanedData = cleanJson(fileData);
      suggestions = JSON.parse(cleanedData);
    } catch (e) {
      console.error("Error parsing suggestions.json:", e);
      // Fallback to empty array or throw depending on preference, 
      // but returning empty array is safer for UI
      suggestions = []; 
    }

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
