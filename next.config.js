/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SPOTIFY_CLIENT_ID: "2838f73d38ad4314b2cc7deea1218566",
        SPOTIFY_CLIENT_SECRET: "d57299f36195465e9deed74846b54b9b",
        NEXTAUTH_SECRET: "l1hL3QoJgFdKexL0hKyPzIqZK6RFE1Kw4VRN8Yn0Z/yd5l4IUKsHjQ4+KOqLPl0LuflKuLe1U5yt9z4vBVkOBQ==",
        NEXT_PUBLIC_SPOTIFY_TOKEN: "https://accounts.spotify.com/api/token",
        NEXT_PUBLIC_SPOTIFY_URL: "https://api.spotify.com/v1/"
    }
}

module.exports = nextConfig
