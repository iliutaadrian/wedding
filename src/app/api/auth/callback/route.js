/**
 * @file route.js
 * @description API endpoint that handles Spotify's redirect after user login and exchanges the authorization code for access and refresh tokens. These tokens allow
 *              the app to interact with Spotify on behalf of the user (e.g., managing playlists). The tokens should be stored securely for future use in
 *              authenticated requests.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  // Get the authorization code from the query string
  const code = new URL(req.url).searchParams.get("code");
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  // If the authorization code is missing, return an error response
  if (!code) {
    return NextResponse.json(
      { error: "Authorization code missing" },
      { status: 400 }
    );
  }

  try {
    // Exchange the authorization code for access and refresh tokens
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri, // Must match the redirect URI used during login
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Destructure the access and refresh tokens from the response
    const { access_token, refresh_token } = response.data;

    // Return a success message with the tokens
    return NextResponse.json({
      message: "Successfully authenticated with Spotify!",
      access_token,
      refresh_token,
    });
  } catch (error) {
    // catch unexpected errors
    console.error("Error exchanging authorization code for tokens:", error);
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    );
  }
}
