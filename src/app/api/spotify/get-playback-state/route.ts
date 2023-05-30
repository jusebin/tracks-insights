import {fetchSpotifyApi} from "@/app/helpers/fetchSpotifyApi";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    const response = (await fetchSpotifyApi(`me/player`, 'GET', body.access_token));
    return NextResponse.json(response);
}
