/**
 * @file route.js
 * @description API endpoint to add a track to the Spotify playlist. The track is added based on the provided track URI, ensuring it doesn't already exist in the playlist.
 *              The songs added arrive directly to the playlist of my Spotify account.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import { NextResponse } from "next/server";
import { getValidUserAccessToken } from "@/utils/spotifyUser";

export async function POST(req) {
  try {
    // Parse the request to get the track URI
    const { trackUri } = await req.json();

    // Validate if the track URI is provided
    if (!trackUri) {
      return NextResponse.json(
        { error: "trackUri is required" },
        { status: 400 }
      );
    }

    // Get a valid Spotify access token to authenticate API requests
    const accessToken = await getValidUserAccessToken();
    if (!accessToken) {
      return NextResponse.json(
        { error: "Unable to obtain Spotify access token" },
        { status: 500 }
      );
    }

    const playlistId = process.env.SPOTIFY_PLAYLIST_ID;

    // Fetch existing tracks from the playlist to check if the track already exists
    const existingTracksResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items(track(uri))&limit=100`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Handle error when fetching existing tracks
    if (!existingTracksResponse.ok) {
      const errorData = await existingTracksResponse.json();
      console.error("Error Fetching Tracks: ", errorData);
      return NextResponse.json(
        { error: "Failed to fetch existing tracks", details: errorData },
        { status: 400 }
      );
    }

    const existingTracksData = await existingTracksResponse.json();

    // Check if the track is already in the playlist
    const trackExists = existingTracksData.items.some(
      (item) => item.track.uri === trackUri
    );

    if (trackExists) {
      // Track already exists, no need to add
      return NextResponse.json({ message: "Track already in playlist" });
    }

    // Add the track to the playlist since it doesn't exist yet
    const addTrackResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: [trackUri],
        }),
      }
    );

    // Handle successful track addition
    if (addTrackResponse.ok) {
      return NextResponse.json({ message: "Track added successfully!" });
    } else {
      // Handle error when adding the track
      const errorData = await addTrackResponse.json();
      console.log("Error Adding Track: ", errorData);
      return NextResponse.json(
        { error: "Failed to add track", details: errorData },
        { status: 400 }
      );
    }
  } catch (error) {
    // Catch any unexpected errors and return a 500 response
    console.log("Catch Block Error: ", error.message);
    return NextResponse.json(
      { error: "Error adding track to playlist", details: error.message },
      { status: 500 }
    );
  }
}
