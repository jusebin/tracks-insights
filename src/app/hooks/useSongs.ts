import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";

export function useSongs(limit: number) {
    const [songs, setSongs] = useState([]);
    const {data: session} = useSession();

    useEffect(() => {
        if (!songs.length) {
            (async () => {
                const data =  await (await fetch('/api/spotify/get-top-items', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                        limit
                    })
                })).json();

                setSongs(data);
            })();
        }
    }, [limit, session.access_token, songs.length]);

    return {songs};
}
