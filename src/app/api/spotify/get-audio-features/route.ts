import {fetchSpotifyApi} from "@/app/helpers/fetch-spotify-api";
import {NextResponse} from "next/server";
import AudioFeaturesResponse = SpotifyApi.AudioFeaturesResponse;

export async function POST(request: Request) {
    const body = await request.json();

    const response = (await fetchSpotifyApi(
            `audio-features/${body.id}`,
            'GET',
            body.access_token)
    );

    return NextResponse.json<AudioFeaturesResponse>(response);
}
