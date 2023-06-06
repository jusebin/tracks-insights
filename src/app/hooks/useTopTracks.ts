import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import TrackObjectFull = SpotifyApi.TrackObjectFull;

export function useTopTracks(limit: number, timeRange: string) {
    const {data: session} = useSession();
    const [topTracksLoading, setTopTracksLoading] = useState<boolean>(false);
    const [topTracks, setTopTracks] = useState<TrackObjectFull[]>([]);

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

            if (!topTracks.length) {
                setTopTracksLoading(true);
            }

            if (topTracksLoading) {
                (async () => {
                    const data = await getData();
                    setTopTracksLoading(false);
                    setTopTracks(data.items)
                })();
            }
        }
    }, [session, topTracks, topTracksLoading, limit, timeRange]);

    return {topTracks, topTracksLoading, setTopTracksLoading}
}
