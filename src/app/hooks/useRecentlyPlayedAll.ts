import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import UsersRecentlyPlayedTracksResponse = SpotifyApi.UsersRecentlyPlayedTracksResponse;

export function useRecentlyPlayedAll(timeValue: number) {
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
                        limit: 50,
                        label: 'after'
                    })
                })).json();

                setRecentlyPlayed(data);
            })();
        }
    }, [recentlyPlayed, session, timeValue]);

    return {recentlyPlayed}
}
