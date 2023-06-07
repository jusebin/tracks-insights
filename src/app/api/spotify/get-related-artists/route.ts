import {fetchSpotifyApi} from "@/app/helpers/fetch-spotify-api";
import {NextResponse} from "next/server";
import PagingObject = SpotifyApi.PagingObject;
import ArtistsRelatedArtistsResponse = SpotifyApi.ArtistsRelatedArtistsResponse;

export async function POST(request: Request) {
    const body = await request.json();

    const params = new URLSearchParams({
       market: body.country
    });

    const response = (await fetchSpotifyApi(
            `artists/${body.id}/related-artists?${params}`,
            'GET',
            body.access_token
        )
    );

    return NextResponse.json<PagingObject<ArtistsRelatedArtistsResponse>>(response);
}
