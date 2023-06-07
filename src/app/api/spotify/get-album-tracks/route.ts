import {fetchSpotifyApi} from "@/app/helpers/fetch-spotify-api";
import {NextResponse} from "next/server";
import PagingObject = SpotifyApi.PagingObject;
import TrackObjectFull = SpotifyApi.TrackObjectFull;

export async function POST(request: Request) {
    const body = await request.json();

    const params = new URLSearchParams({
       limit: String(50),
       offset: String(body.offset)
    });

    const response = (await fetchSpotifyApi(
            `albums/${body.id}/tracks?${params}`,
            'GET',
            body.access_token
        )
    );

    return NextResponse.json<PagingObject<TrackObjectFull[]>>(response);
}
