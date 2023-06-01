import {fetchSpotifyApi} from "@/app/helpers/fetchSpotifyApi";
import {NextResponse} from "next/server";
import AlbumObjectFull = SpotifyApi.AlbumObjectFull;

export async function POST(request: Request) {
    const body = await request.json();

    const response = (await fetchSpotifyApi(
            `albums/${body.id}`,
            'GET',
            body.access_token)
    );

    return NextResponse.json<AlbumObjectFull>(response);
}
