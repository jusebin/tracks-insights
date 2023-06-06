import TrackObjectFull = SpotifyApi.TrackObjectFull;
import TrackObjectSimplified = SpotifyApi.TrackObjectSimplified;
import {convertMsToMinutes} from "@/app/helpers/convertMsToMinutes";

/**
 *
 * @param tracks - a TrackObjectFull or TrackObjectSimplified array
 * @return string - the total duration time for an album (composed of a TrackObjectFull of TrackObjectSimplified array)
 * @example
 *
 * const tracks = [
 *    {duration_ms: 180000, ...},
 *    {duration_ms: 180000, ...},
 * ]
 *
 * getTracksDuration(tracks) will return "6:00"
 *
 */
export function getTracksDuration(tracks: TrackObjectFull[] | TrackObjectSimplified[]): string {
    let duration = 0;

    tracks.forEach((track, index) => {
       duration += track.duration_ms;
    });

    return convertMsToMinutes(duration);
}
