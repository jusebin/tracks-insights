import ArtistObjectFull = SpotifyApi.ArtistObjectFull;

export const fetchArtist = async (array: [string, {
    id: string,
    access_token: string
}]): Promise<ArtistObjectFull> => {
    const {id, access_token} = array[1];
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

    return await (await fetch('/api/spotify/get-artist', options)).json()
}
