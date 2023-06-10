import TrackObjectFull = SpotifyApi.TrackObjectFull;
import PagingObject = SpotifyApi.PagingObject;

export const fetchAlbumTracks = async ({id, tracksLength, access_token}: {
    id: string,
    tracksLength: number,
    access_token: string
}): Promise<TrackObjectFull[]> => {
    const recursiveTracks: any = async (array: TrackObjectFull[], offset: number) => {
        const options = {
            method: "POST",
            body: JSON.stringify({
                id,
                offset: offset,
                access_token
            })
        };

        const data: PagingObject<TrackObjectFull> = await (await fetch('/api/spotify/get-album-tracks', {...options})).json();
        const tmp: TrackObjectFull[] = array.concat(data.items);

        return tmp.length === tracksLength ? tmp : await recursiveTracks(tmp, (offset + 1) * 50);
    }

    return await recursiveTracks([], 0);
}
