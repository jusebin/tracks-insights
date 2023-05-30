'use client';
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;

export function useArtists(limit: number, timeRange: string) {
    const {data: session} = useSession();
    const [artistsLoading, setArtistsLoading] = useState<boolean>(false);
    const [artists, setArtists] = useState<ArtistObjectFull[]>([]);

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

            if (!artists.length) {
                setArtistsLoading(true);
            }

            if (artistsLoading) {
                (async () => {
                    const data = await getData();
                    setArtistsLoading(false);
                    setArtists(data.items);
                })();
            }
        }
    }, [session, artists, limit, timeRange, artistsLoading]);

    return {artists, setArtistsLoading};
}
