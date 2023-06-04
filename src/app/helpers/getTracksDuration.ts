import TrackObjectFull = SpotifyApi.TrackObjectFull;
import TrackObjectSimplified = SpotifyApi.TrackObjectSimplified;
import {convertMsToMinutes} from "@/app/helpers/convertMsToMinutes";

export function getTracksDuration(tracks: TrackObjectFull[] | TrackObjectSimplified[]): string {
    let duration = 0;

    tracks.forEach((track, index) => {
       duration += track.duration_ms;
    });

    return convertMsToMinutes(duration);
}
