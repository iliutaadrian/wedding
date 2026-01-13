/**
 * @file route.js
 * @description API endpoint to generate the Spotify login URL for user authentication. This URL includes the required permissions (scopes) to modify playlists on the user's behalf, and redirects the user to Spotify's login page for authorization.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

export async function GET() {
  // Retrieve Spotify client credentials from environment variables
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI; // e.g. http://localhost:3000/api/auth/callback
  // Define the Spotify scopes (permissions) required for playlist modification
  const scope = "playlist-modify-public playlist-modify-private";

  // Generate the Spotify authorization URL
  const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scope)}`;

  // Return the generated login URL in a JSON response
  return new Response(JSON.stringify({ loginUrl }), {
    headers: { "Content-Type": "application/json" },
  });
}
