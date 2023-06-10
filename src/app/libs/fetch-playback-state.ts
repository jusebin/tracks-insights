import CurrentlyPlayingObject = SpotifyApi.CurrentlyPlayingObject;

export const fetchPlaybackState = async (array: [number, {
    access_token: string
}]): Promise<CurrentlyPlayingObject | undefined> => {
    const {access_token} = array[1];
    const options = {
        method: "POST",
        body: JSON.stringify({
            access_token
        })
    };

    return await (await fetch('/api/spotify/get-playback-state', options)).json();
}
