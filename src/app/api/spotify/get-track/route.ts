import {fetchSpotifyApi} from "@/app/helpers/fetchSpotifyApi";
import {NextResponse} from "next/server";
import SingleTrackResponse = SpotifyApi.SingleTrackResponse;

export async function POST(request: Request) {
    const body = await request.json();

    console.log(body.access_token);

    const response = (await fetchSpotifyApi(
        `tracks/${body.id}`,
        'GET',
        body.access_token)
    );

    return NextResponse.json<SingleTrackResponse>(response);
}
