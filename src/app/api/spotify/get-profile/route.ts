import {fetchSpotifyApi} from "@/app/helpers/fetch-spotify-api";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    const response = (await fetchSpotifyApi(`me/`, 'GET', body.access_token));
    return NextResponse.json(response);
}
