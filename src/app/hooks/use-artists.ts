import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import MultipleArtistsResponse = SpotifyApi.MultipleArtistsResponse;

export default function useArtists(ids: string) {
    const {data: session} = useSession();
    const [artists, setArtists] = useState<ArtistObjectFull[]>([]);

    useEffect(() => {
        if (!!session && ids.length) {
            const getData = async (): Promise<MultipleArtistsResponse> => {
                return await (await fetch('/api/spotify/get-artists', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                        ids
                    })
                })).json();
            }

            if (!artists.length) {
                (async () => {
                    const data = await getData();
                    setArtists(data.artists);
                })();
            }
        }
    }, [session, artists, ids]);

    return {artists};
}
