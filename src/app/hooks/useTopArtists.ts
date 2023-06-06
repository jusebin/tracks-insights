import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;

export function useTopArtists(limit: number, timeRange: string) {
    const {data: session} = useSession();
    const [topArtistsLoading, setTopArtistsLoading] = useState<boolean>(false);
    const [topArtists, setTopArtists] = useState<ArtistObjectFull[]>([]);

    useEffect(() => {
        if (!!session) {
            const getData = async () => {
                return await (await fetch('/api/spotify/get-top-items', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                        type: 'artists',
                        timeRange,
                        limit
                    })
                })).json();
            };

            if (!topArtists.length) {
                setTopArtistsLoading(true);
            }

            if (topArtistsLoading) {
                (async () => {
                    const data = await getData();
                    setTopArtistsLoading(false);
                    setTopArtists(data.items);
                })();
            }
        }
    }, [session, topArtists, topArtistsLoading, limit, timeRange]);

    return {topArtists, setTopArtistsLoading};
}
