import {fetchSpotifyApi} from "@/app/helpers/fetch-spotify-api";
import {NextResponse} from "next/server";
import SingleTrackResponse = SpotifyApi.SingleTrackResponse;
import SearchResponse = SpotifyApi.SearchResponse;

export async function POST(request: Request) {
    const body = await request.json();

    const params = new URLSearchParams({
        q: body.q,
        type: body.type,
    });

    const response = (await fetchSpotifyApi(
            `search?${params}`,
            'GET',
            body.access_token)
    );

    return NextResponse.json<SearchResponse>(response);
}
