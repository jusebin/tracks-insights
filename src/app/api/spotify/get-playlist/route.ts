import {NextResponse} from "next/server";
import PlaylistObjectFull = SpotifyApi.PlaylistObjectFull;

export async function POST(request: Request) {
    const body = await request.json();

    const {access_token} = await (await fetch(process.env.NEXT_PUBLIC_SPOTIFY_TOKEN || '', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${(Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'))}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    })).json();

    const playlist = await (await fetch(`${process.env.NEXT_PUBLIC_SPOTIFY_URL}playlists/${body.playlistId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })).json();

    // Then get the data needed
    return NextResponse.json<PlaylistObjectFull>(playlist);
}
