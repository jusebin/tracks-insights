import {fetchSpotifyApi} from "@/app/helpers/fetchSpotifyApi";
import {NextResponse} from "next/server";
import PagingObject = SpotifyApi.PagingObject;
import ArtistsTopTracksResponse = SpotifyApi.ArtistsTopTracksResponse;

export async function POST(request: Request) {
    const body = await request.json();

    const params = new URLSearchParams({
        market: body.country
    });

    const response = (await fetchSpotifyApi(
            `artists/${body.id}/top-tracks?${params}`,
            'GET',
            body.access_token
        )
    );

    return NextResponse.json<PagingObject<ArtistsTopTracksResponse>>(response);
}