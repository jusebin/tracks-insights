import {useEffect, useState} from "react";
import CurrentlyPlayingObject = SpotifyApi.CurrentlyPlayingObject;
import {useSession} from "next-auth/react";

export function usePlaybackState() {
    const {data: session} = useSession();
    const [playbackState, setPlaybackState] = useState<CurrentlyPlayingObject |undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (!playbackState && session) {
                const data =  await (await fetch('/api/spotify/get-playback-state', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                    })
                })).json();

                setPlaybackState(data);
            }
        })();
    }, [session, playbackState]);

    return {playbackState};
}
