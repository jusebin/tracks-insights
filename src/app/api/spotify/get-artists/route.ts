import {fetchSpotifyApi} from "@/app/helpers/fetch-spotify-api";
import {NextResponse} from "next/server";
import MultipleArtistsResponse = SpotifyApi.MultipleArtistsResponse;

export async function POST(request: Request) {
    const body = await request.json();

    const params: URLSearchParams = new URLSearchParams({
        ids: body.ids
    })

    const response = (await fetchSpotifyApi(
            `artists?${params}`,
            'GET',
            body.access_token
        )
    );

    return NextResponse.json<MultipleArtistsResponse>(response);
}
