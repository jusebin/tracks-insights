import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import ArtistObjectSimplified = SpotifyApi.ArtistObjectSimplified;
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import TrackObjectSimplified = SpotifyApi.TrackObjectSimplified;

export function getItemsIds(array: ArtistObjectFull[] | ArtistObjectSimplified[] | TrackObjectFull[] | TrackObjectSimplified[]): string[] {
    return array.map((item) => item.id);
}
