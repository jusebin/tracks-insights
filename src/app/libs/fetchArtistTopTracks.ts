import TrackObjectFull = SpotifyApi.TrackObjectFull;
import ArtistsTopTracksResponse = SpotifyApi.ArtistsTopTracksResponse;

export const fetchArtistTopTracks = async (array: [string, {
    id: string,
    country: string,
    access_token: string
}]): Promise<TrackObjectFull[]> => {
    const {id, country, access_token} = array[1];
    const options = {
        method: "POST",
        body: JSON.stringify({
            id,
            country,
            access_token
        })
    };

    const data: ArtistsTopTracksResponse = await (await fetch('/api/spotify/get-artist-top-tracks', options)).json();
    return data.tracks;
}
