import {useEffect, useState} from "react";
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import {useSession} from "next-auth/react";
import SearchResponse = SpotifyApi.SearchResponse;

export function useQuery(type: 'album' | 'track' | 'artist' | 'playlist', q?: string, ) {
    const {data: session} = useSession();
    const [queryLoading, setQueryLoading] = useState(false);
    const [query, setQuery] = useState<SearchResponse | undefined>(undefined);

    useEffect(() => {
        if (!!session && !!q) {
            const getData = async () => {
                return await (await fetch('/api/spotify/get-query', {
                    method: 'POST',
                    body: JSON.stringify({
                        access_token: session.access_token,
                        type,
                        q
                    })
                })).json();
            }

            if (!query) {
                setQueryLoading(true);
            }

            if (queryLoading) {
                (async () => {
                    const data = await getData();
                    setQueryLoading(false);
                    setQuery(data);
                })();
            }
        }
    }, [session, query, queryLoading, type, q]);

    return {query, queryLoading}
}
