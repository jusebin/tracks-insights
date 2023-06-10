import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import ArtistsRelatedArtistsResponse = SpotifyApi.ArtistsRelatedArtistsResponse;

export const fetchRelatedArtists = async (array: [string, {
    id: string,
    country: string,
    access_token: string
}]): Promise<ArtistObjectFull[]> => {
    const {id, country, access_token} = array[1];
    const options = {
        method: "POST",
        body: JSON.stringify({
            id,
            country,
            access_token
        })
    };

    const data: ArtistsRelatedArtistsResponse = await (await fetch('/api/spotify/get-related-artists', options)).json()
    return data.artists;
}
