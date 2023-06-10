export const fetchTopItems = async (array: [number, {
    timeRange: "short_term" | "medium_term" | "long_term",
    type: 'artists' | 'tracks',
    access_token: string
}]) => {
    const {timeRange, type, access_token} = array[1];
    const options = {
        method: "POST",
        body: JSON.stringify({
            timeRange,
            type,
            access_token
        })
    };

    return await (await fetch('/api/spotify/get-top-items', options)).json();
};
