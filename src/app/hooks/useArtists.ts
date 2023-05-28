import {useCallback, useEffect, useState} from "react";
import {useSession} from "next-auth/react";

export function useArtists(limit: number) {
    const [artists, setArtists] = useState([]);
    const {data: session} = useSession();

    useEffect(() => {
        if (!artists.length) {
            (async () => {
                const data =  await (await fetch('/api/spotify/get-top-items', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                        isArtists: true,
                        limit
                    })
                })).json();

                setArtists(data);
            })();
        }
    }, [session.access_token, artists.length, limit]);

    return {artists};
}
