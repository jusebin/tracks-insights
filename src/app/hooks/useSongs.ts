'use client';

import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";

export function useSongs(limit: number) {
    const {data: session} = useSession();
    const [songs, setSongs] = useState([]);
    const [next, setNext] = useState(undefined);

    useEffect(() => {
        if (!songs.length && !!session) {
            (async () => {
                const data =  await (await fetch('/api/spotify/get-top-items', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                        limit
                    })
                })).json();

                setSongs(data.items);
            })();
        }
    }, [limit, session, songs]);

    return {songs};
}
