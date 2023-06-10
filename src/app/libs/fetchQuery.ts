import SearchResponse = SpotifyApi.SearchResponse;

export const fetchQuery = async ({q, type, access_token}: {
    q: string,
    type: 'album' | 'track' | 'artist' | 'playlist',
    access_token: string
}): Promise<SearchResponse> => {
    const options = {
        method: "POST",
        body: JSON.stringify({q, type, access_token})
    };

    return await (await fetch('/api/spotify/get-query', options)).json();
}
