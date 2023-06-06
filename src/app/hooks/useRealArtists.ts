import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import MultipleArtistsResponse = SpotifyApi.MultipleArtistsResponse;

export function useRealArtists(ids: string) {
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
                    console.log('data', data);
                    setArtists(data.artists);
                })();
            }
        }
    }, [session, artists, ids]);

    return {artists};
}
