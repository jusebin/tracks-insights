import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import UsersRecentlyPlayedTracksResponse = SpotifyApi.UsersRecentlyPlayedTracksResponse;

export function useRecentlyPlayed(
    limit: number,
    timeValue: number,
    label: 'before' | 'after'
) {
    const {data: session} = useSession();
    const [recentlyPlayed, setRecentlyPlayed] = useState<UsersRecentlyPlayedTracksResponse | undefined>(undefined);

    useEffect(() => {
        if (!!session && !recentlyPlayed) {
            (async () => {
                const data =  await (await fetch('/api/spotify/get-recently-played', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                        timeValue,
                        label,
                        limit
                    })
                })).json();

                setRecentlyPlayed(data);
            })();
        }
    }, [recentlyPlayed, session, limit, timeValue, label]);

    return {recentlyPlayed}
}
