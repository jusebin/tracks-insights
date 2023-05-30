'use client';

import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import TrackObjectFull = SpotifyApi.TrackObjectFull;

export function useSongs(limit: number, timeRange: string) {
    const {data: session} = useSession();
    const [songsLoading, setSongsLoading] = useState<boolean>(false);
    const [songs, setSongs] = useState<TrackObjectFull[]>([]);

    // console.log(session?.access_token);

    useEffect(() => {
        if (!!session) {
            const getData = async () => {
                return await (await fetch('/api/spotify/get-top-items', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                        type: 'tracks',
                        limit,
                        timeRange
                    })
                })).json();
            }

            if (!songs.length) {
                setSongsLoading(true);
            }

            if (songsLoading) {
                (async () => {
                    const data = await getData();
                    setSongsLoading(false);
                    setSongs(data.items)
                })();
            }
        }
    }, [limit, timeRange, session, songs, songsLoading]);

    return {songs, songsLoading, setSongsLoading}
}
