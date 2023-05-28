import {NextResponse} from "next/server";
import {fetchSpotifyApi} from "@/app/helpers/fetchSpotifyApi";

export async function GET(request: Request) {
    return NextResponse.json({ok: true});
}

export async function POST(request: Request) {
    const body = await request.json();
    const type = body.isArtists ? 'artists' : 'tracks'
    const params = new URLSearchParams({
        limit: body.limit,
        offset: 0,
        time_range: 'short_term'
    });

    const response = (await fetchSpotifyApi(`me/top/${type}?${params}`, 'GET', body.access_token)).items;
    return NextResponse.json(response);
}
