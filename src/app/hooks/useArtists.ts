'use client';
import {useCallback, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;

export function useArtists(limit: number): {
    artists: ArtistObjectFull[]
} {
    const [artists, setArtists] = useState<ArtistObjectFull[]>([]);
    const {data: session} = useSession();

    useEffect(() => {
        if (!artists.length && !!session) {
            (async () => {
                const data =  await (await fetch('/api/spotify/get-top-items', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                        isArtists: true,
                        limit
                    })
                })).json();

                setArtists(data.items);
            })();
        }
    }, [session, artists, limit]);

    return {artists};
}
