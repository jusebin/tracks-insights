import MultipleArtistsResponse = SpotifyApi.MultipleArtistsResponse;
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;

export const fetchArtists = async ({ids, access_token}: {
    ids: string,
    access_token: string
}): Promise<ArtistObjectFull[]> => {
    const options = {
        method: "POST",
        body: JSON.stringify({
            ids,
            access_token
        })
    };

    const data: MultipleArtistsResponse = await (await fetch('/api/spotify/get-artists', options)).json();

    return data.artists;
}
