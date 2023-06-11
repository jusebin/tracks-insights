import UsersRecentlyPlayedTracksResponse = SpotifyApi.UsersRecentlyPlayedTracksResponse;

export const fetchRecentlyPlayed = async (array: [number, {
    access_token: string
}]): Promise<UsersRecentlyPlayedTracksResponse> => {
    const {access_token} = array[1];
    const options = {
        method: "POST",
        body: JSON.stringify({
            access_token
        })
    };

    return await (await fetch('/api/spotify/get-recently-played', options)).json();
}
