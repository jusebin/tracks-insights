import AlbumObjectFull = SpotifyApi.AlbumObjectFull;

export const fetchAlbum = async ({id, access_token}: {
    id: string,
    access_token: string
}): Promise<AlbumObjectFull> => {
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

    return await (await fetch('/api/spotify/get-album', options)).json()
}
