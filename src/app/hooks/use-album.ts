import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import AlbumObjectFull = SpotifyApi.AlbumObjectFull;

export function useAlbum(id: string) {
    const {data: session} = useSession();
    const [albumLoading, setAlbumLoading] = useState(false);
    const [album, setAlbum] = useState<AlbumObjectFull | undefined>(undefined);

    useEffect(() => {
        if (!!session) {
            const getData = async () => {
                return await (await fetch('/api/spotify/get-album', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                        id
                    })
                })).json();
            }

            if (!album) {
                setAlbumLoading(true);
            }

            if (albumLoading) {
                (async () => {
                    const data = await getData();
                    setAlbumLoading(false);
                    setAlbum(data);
                })();
            }
        }
    }, [session, album, albumLoading, id]);

    return {album, setAlbumLoading}
}
