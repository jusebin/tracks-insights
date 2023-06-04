import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import TrackObjectFull = SpotifyApi.TrackObjectFull;

export function useAlbumTracks(id: string, trackLength: number) {
    const {data: session} = useSession();
    const [offset, setOffset] = useState<number>(0);
    const [albumTracks, setAlbumTracks] = useState<TrackObjectFull[]>([]);

    useEffect(() => {
        if (!!session) {
            const getData = async () => {
                return await (await fetch('/api/spotify/get-album-tracks', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                        offset,
                        id
                    })
                })).json();
            }

            if (albumTracks.length < trackLength && trackLength > 0) {
                (async () => {
                    const data = await getData();

                    const temp = albumTracks.concat(data.items);

                    setOffset(() => (offset + 1) * 50);
                    setAlbumTracks(temp);
                })();
            }
        }
    }, [albumTracks, offset, session, id, trackLength]);

    return {albumTracks, offset};
}
