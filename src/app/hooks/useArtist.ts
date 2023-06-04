import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;

export function useArtist(id: string) {
    const {data: session} = useSession();
    const [artist, setArtist] = useState<ArtistObjectFull | undefined>(undefined);

    useEffect(() => {
        if (!!session) {
            const getData = async () => {
                return await (await fetch('/api/spotify/get-artist', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                        id
                    })
                })).json();
            }

            if (!artist) {
                (async () => {
                    const data = await getData();
                    setArtist(data);
                })();
            }
        }
    }, [session,artist, id]);

    return {artist}
}
