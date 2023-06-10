import ArtistsAlbumsResponse = SpotifyApi.ArtistsAlbumsResponse;
import AlbumObjectSimplified = SpotifyApi.AlbumObjectSimplified;

export const fetchArtistAlbums = async (array: [string, {
    id: string,
    access_token: string
}]): Promise<AlbumObjectSimplified[]> => {
    const {id, access_token} = array[1];

    const options = {
        method: "POST",
        body: JSON.stringify({
            id,
            access_token
        })
    };

    const data: ArtistsAlbumsResponse = await (await fetch('/api/spotify/get-artist-albums', options)).json()
    return data.items;
}
