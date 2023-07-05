import PlaylistObjectFull = SpotifyApi.PlaylistObjectFull;
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import {getTracksFromPlaylist} from "@/app/helpers/get-tracks-from-playlist";

export const fetchPlaylist = async ({playlistId}: {
    playlistId: string
}): Promise<TrackObjectFull[]> => {
    const options = {
        method: 'POST',
        body: JSON.stringify({
            playlistId
        })
    };

    const playlist = await (await fetch('/api/spotify/get-playlist', options)).json();
    return getTracksFromPlaylist(playlist);
}
