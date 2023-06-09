import {fetchSpotifyApi} from "@/app/helpers/fetch-spotify-api";
import {NextResponse} from "next/server";
import SingleTrackResponse = SpotifyApi.SingleTrackResponse;

export async function POST(request: Request) {
    const body = await request.json();

    const response = (await fetchSpotifyApi(
        `tracks/${body.id}`,
        'GET',
        body.access_token)
    );

    return NextResponse.json<SingleTrackResponse>(response);
}
