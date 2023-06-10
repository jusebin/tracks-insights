import {useEffect, useState} from "react";
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import {useSession} from "next-auth/react";

export default function useTrack(id: string) {
    const {data: session} = useSession();
    const [trackLoading, setTrackLoading] = useState(false);
    const [track, setTrack] = useState<TrackObjectFull | undefined>(undefined);

    useEffect(() => {
        if (!!session) {
            const getData = async () => {
                await new Promise(resolve => {
                    setTimeout(resolve, 3000);
                });

                return await (await fetch('/api/spotify/get-track', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                        id
                    })
                })).json();
            }

            if (!track) {
                setTrackLoading(true);
            }

            if (trackLoading) {
                (async () => {
                    const data = await getData();
                    setTrackLoading(false);
                    setTrack(data);
                })();
            }
        }
    }, [session, track, trackLoading, id]);

    return {track, setTrackLoading}
}
