import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import AlbumObjectFull = SpotifyApi.AlbumObjectFull;

export function useArtistAlbums(id: string) {
    const {data: session} = useSession();
    const [albums, setAlbums] = useState<AlbumObjectFull[]>([]);

    useEffect(() => {
        if (!!session) {
            const getData = async () => {
                return await (await fetch('/api/spotify/get-artist-albums', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                        id
                    })
                })).json();
            }

            if (!albums.length) {
                (async () => {
                    const data = await getData();
                    setAlbums(data.items);
                })();
            }
        }
    }, [session,albums, id]);

    return {albums}
}
