import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import UsersRecentlyPlayedTracksResponse = SpotifyApi.UsersRecentlyPlayedTracksResponse;

export function useRecentlyPlayed() {
    const {data: session} = useSession();
    const [recentlyPlayedLoading, setRecentlyPlayedLoading] = useState<boolean>(false);
    const [recentlyPlayed, setRecentlyPlayed] = useState<UsersRecentlyPlayedTracksResponse | undefined>(undefined);

    useEffect(() => {
        if (!!session) {
            if (!recentlyPlayed && !recentlyPlayedLoading) {
                setRecentlyPlayedLoading(true);
            }

            if (recentlyPlayedLoading && !recentlyPlayed) {
                (async () => {
                    const data = await (await fetch('/api/spotify/get-recently-played', {
                        method: 'POST',
                        body: JSON.stringify({access_token: session.access_token,})
                    })).json();

                    setRecentlyPlayedLoading(false);
                    setRecentlyPlayed(data);
                })();
            }
        }
    }, [recentlyPlayed, recentlyPlayedLoading, session]);

    return {recentlyPlayed}
}
