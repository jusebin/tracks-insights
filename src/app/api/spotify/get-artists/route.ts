import {fetchSpotifyApi} from "@/app/helpers/fetchSpotifyApi";
import {NextResponse} from "next/server";
import MultipleArtistsResponse = SpotifyApi.MultipleArtistsResponse;

export async function POST(request: Request) {
    const body = await request.json();

    const params: URLSearchParams = new URLSearchParams({
        ids: body.ids
    })

    console.log(body.access_token);
    console.log(`artists?${params}`);

    const response = (await fetchSpotifyApi(
            `artists?${params}`,
            'GET',
            body.access_token
        )
    );

    return NextResponse.json<MultipleArtistsResponse>(response);
}
