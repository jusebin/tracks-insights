import {NextResponse} from "next/server";
import {fetchSpotifyApi} from "@/app/helpers/fetchSpotifyApi";
import UsersRecentlyPlayedTracksResponse = SpotifyApi.UsersRecentlyPlayedTracksResponse;

export async function POST(request: Request) {
    const body = await request.json();
    const params = `limit=${body.limit}&${body.label === 'before' ? `before=${body.timeValue}` : `after=${body.timeValue}`}`;

    console.log('adaytoremember', params);
    console.log('token', body.access_token)

    const response = await fetchSpotifyApi(
        `me/player/recently-played?${params}`,
        'GET',
        body.access_token
    );

    return NextResponse.json<UsersRecentlyPlayedTracksResponse>(response)
}
