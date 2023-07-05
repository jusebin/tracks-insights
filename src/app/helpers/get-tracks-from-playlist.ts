import TrackObjectFull = SpotifyApi.TrackObjectFull;
import PlaylistObjectFull = SpotifyApi.PlaylistObjectFull;

export const getTracksFromPlaylist = (playlist: PlaylistObjectFull): TrackObjectFull[] => {
    const tracks: TrackObjectFull[] = [];

    for (const item of playlist.tracks.items) {
        if (item.track !== null) {
            tracks.push(item.track);
        }
    }

    return tracks;
}
