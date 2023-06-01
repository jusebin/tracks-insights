import {NextResponse} from "next/server";
import {fetchSpotifyApi} from "@/app/helpers/fetchSpotifyApi";
import UsersRecentlyPlayedTracksResponse = SpotifyApi.UsersRecentlyPlayedTracksResponse;

export async function POST(request: Request) {
    const body = await request.json();
    const params = new URLSearchParams({
       limit: String(50),
       before: String(Date.now())
    });

    console.log('token', body.access_token)

    const response = await fetchSpotifyApi(
        `me/player/recently-played?${params}`,
        'GET',
        body.access_token
    );

    return NextResponse.json<UsersRecentlyPlayedTracksResponse>(response)
}
