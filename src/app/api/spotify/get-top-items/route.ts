import {NextResponse} from "next/server";
import {fetchSpotifyApi} from "@/app/helpers/fetch-spotify-api";
import PagingObject = SpotifyApi.PagingObject;
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import TrackObjectFull = SpotifyApi.TrackObjectFull;

export async function POST(request: Request) {
    const body = await request.json();
    const params = new URLSearchParams({
        limit: String(body.limit),
        offset: String(0),
        time_range: body.timeRange
    });

    const response = (await fetchSpotifyApi(`me/top/${body.type}?${params}`, 'GET', body.access_token));
    return NextResponse.json<PagingObject<ArtistObjectFull[] | TrackObjectFull[]>>(response);
}
