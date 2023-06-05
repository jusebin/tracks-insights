import {fetchSpotifyApi} from "@/app/helpers/fetchSpotifyApi";
import {NextResponse} from "next/server";
import SingleTrackResponse = SpotifyApi.SingleTrackResponse;
import SearchResponse = SpotifyApi.SearchResponse;

export async function POST(request: Request) {
    const body = await request.json();

    const params = new URLSearchParams({
        q: body.q,
        type: body.type,
    });

    console.log('GUEULE DE LA REQ', `q?${params}`);


    const response = (await fetchSpotifyApi(
            `search?${params}`,
            'GET',
            body.access_token)
    );

    return NextResponse.json<SearchResponse>(response);
}
