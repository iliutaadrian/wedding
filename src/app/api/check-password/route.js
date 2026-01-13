/**
 * @file route.js
 * @description API endpoint to verify the guest access password for viewing sensitive details like the IBAN. Password validation is handled on the server-side for security reasons.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import { NextResponse } from "next/server";

// Retrieve the password from environment variables
const correctPassword = process.env.GUEST_ACCESS_PASSWORD;

export async function POST(request) {
  try {
    const body = await request.json(); // Get the request body (which contains the password)
    const { password } = body;

    // Check if the password matches the one in the environment variable
    if (password === correctPassword) {
      return NextResponse.json({
        success: true,
        message: "Password is correct",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (error) {
    // handle any unexpected error
    return NextResponse.json({
      success: false,
      message: "Error processing request",
      error,
    });
  }
}
