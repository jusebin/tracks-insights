import TrackObjectFull = SpotifyApi.TrackObjectFull;

export const fetchTrack = async ({id, access_token}: {
    id: string,
    access_token: string
}): Promise<TrackObjectFull> => {
    const options = {
        method: "POST",
        body: JSON.stringify({
          id,
          access_token
        })
    };

    // await new Promise(resolve => {
    //     setTimeout(resolve, 120000);
    // });

    return await (await fetch('/api/spotify/get-track', options)).json()
}
