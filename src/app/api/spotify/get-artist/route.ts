import {fetchSpotifyApi} from "@/app/helpers/fetch-spotify-api";
import {NextResponse} from "next/server";
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;

export async function POST(request: Request) {
    const body = await request.json();

    const response = (await fetchSpotifyApi(
            `artists/${body.id}`,
            'GET',
            body.access_token)
    );

    return NextResponse.json<ArtistObjectFull>(response);
}
