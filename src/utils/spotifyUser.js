/**
 * @file spotifyUser.js
 * @description Manages the Spotify user access token, including handling its expiry, refreshing it using a refresh token, and providing a valid access token
 *              for user-related Spotify API requests, such as search music.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import axios from "axios";
import qs from "qs";

// In-memory storage for user access token and its expiry
let userAccessToken = process.env.SPOTIFY_ACCESS_TOKEN || null;
let userTokenExpiry = null;

/**
 * Sets the user access token and its expiry time.
 * @param {string} token - The new access token.
 * @param {number} expiresIn - The expiry time of the token in seconds.
 */
function setUserAccessToken(token, expiresIn) {
  userAccessToken = token;
  // Set token expiry time (current time + expires_in seconds - buffer)
  userTokenExpiry = Date.now() + (expiresIn - 60) * 1000; // 60-second buffer
}

/**
 * Checks if the user token has expired.
 * @returns {boolean} - True if the token is expired or missing, false otherwise.
 */
function isUserTokenExpired() {
  if (!userAccessToken || !userTokenExpiry) return true;
  return Date.now() > userTokenExpiry;
}

/**
 * Refreshes the Spotify user access token using the refresh token.
 * @returns {string|null} - The new access token or null if refreshing fails.
 */
export async function refreshSpotifyAccessToken() {
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const tokenUrl = "https://accounts.spotify.com/api/token";

  const data = qs.stringify({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
  };

  try {
    const response = await axios.post(tokenUrl, data, { headers });
    const { access_token, expires_in } = response.data;
    setUserAccessToken(access_token, expires_in);
    return access_token;
  } catch (error) {
    console.error(
      "Error refreshing Spotify user access token:",
      error.response?.data || error.message
    );
    return null;
  }
}

/**
 * Retrieves a valid Spotify user access token. Refreshes the token if it has expired.
 * @returns {Promise<string>} - The valid access token.
 * @throws {Error} - If the token cannot be refreshed.
 */
export async function getValidUserAccessToken() {
  if (isUserTokenExpired()) {
    const newToken = await refreshSpotifyAccessToken();
    if (!newToken) {
      throw new Error("Unable to refresh Spotify user access token");
    }
    return newToken;
  }
  return userAccessToken;
}
