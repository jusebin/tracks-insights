import {fetchSpotifyApi} from "@/app/helpers/fetch-spotify-api";
import {NextResponse} from "next/server";
import PagingObject = SpotifyApi.PagingObject;
import AlbumObjectSimplified = SpotifyApi.AlbumObjectSimplified;

export async function POST(request: Request) {
    const body = await request.json();

    const params = new URLSearchParams({
        limit: String(50),
        offset: String(0)
    });

    const response = (await fetchSpotifyApi(
            `artists/${body.id}/albums?${params}`,
            'GET',
            body.access_token
        )
    );

    return NextResponse.json<PagingObject<AlbumObjectSimplified[]>>(response);
}
