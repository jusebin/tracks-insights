import TrackObjectFull = SpotifyApi.TrackObjectFull;
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import PagingObject = SpotifyApi.PagingObject;


type ArtistsOrTracks = 'artists' | 'tracks';
type TrackOrArtist<T extends ArtistsOrTracks> = T extends ArtistsOrTracks ? ArtistObjectFull : TrackObjectFull;

interface Data<T> {
    timeRange: "short_term" | "medium_term" | "long_term",
    type: T,
    access_token: string
}

export async function fetchTopItems<T extends ArtistsOrTracks>(array: [number, Data<T>]): Promise<TrackOrArtist<T>[]> {
    const {timeRange, type, access_token} = array[1];
    const options = {
        method: "POST",
        body: JSON.stringify({
            timeRange,
            type,
            access_token
        })
    };

    const data: PagingObject<TrackOrArtist<T>> = await (await fetch('/api/spotify/get-top-items', options)).json();
    return data.items;
}
