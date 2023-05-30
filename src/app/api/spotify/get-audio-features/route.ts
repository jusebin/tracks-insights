import {fetchSpotifyApi} from "@/app/helpers/fetchSpotifyApi";
import {NextResponse} from "next/server";
import {getStringArrayValues} from "@/app/helpers/getStringArrayValues";
import MultipleAudioFeaturesResponse = SpotifyApi.MultipleAudioFeaturesResponse;

export async function POST(request: Request) {
    const body = await request.json();
    const params = new URLSearchParams({
        ids: getStringArrayValues(body.ids)
    });

    const response = (await fetchSpotifyApi(
            `audio-features?${params}`,
            'GET',
            body.access_token)
    );

    console.log('response from server', response);

    return NextResponse.json<MultipleAudioFeaturesResponse>(response);
}
