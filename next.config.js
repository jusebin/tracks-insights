/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SPOTIFY_CLIENT_ID: '2838f73d38ad4314b2cc7deea1218566',
        SPOTIFY_CLIENT_SECRET: 'd57299f36195465e9deed74846b54b9b',
        NEXTAUTH_URL: 'https://main--lambent-maamoul-6f7230.netlify.app/',
        NEXT_PUBLIC_SPOTIFY_URL: 'https://api.spotify.com/v1/'
    }
}

module.exports = nextConfig
