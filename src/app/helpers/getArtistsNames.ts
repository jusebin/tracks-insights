import ArtistObjectSimplified = SpotifyApi.ArtistObjectSimplified;

/**
 *
 * @param artists - a ArtistObjectSimplified object array
 * @return string - a string containing the artists names
 *
 * artists = [
 *      {name: "John" ...},
 *      {name: "Doe" ...}
 * ]
 *
 * getArtistsNames(artists) will return "John, Doe"
 *
 */
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
