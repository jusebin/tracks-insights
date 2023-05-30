import ArtistObjectSimplified = SpotifyApi.ArtistObjectSimplified;

export function getArtistsNames(artists: ArtistObjectSimplified[]): string {
    let names = '';

    for (let i = 0; i < artists.length; i++) {
        names+= artists[i].name;

        if (i < artists.length - 1) (
            names+= ', '
        )
    }

    return names;
}
