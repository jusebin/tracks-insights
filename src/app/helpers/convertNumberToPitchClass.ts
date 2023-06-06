import {PITCH_CLASS} from "@/app/constants/pitchClass";

/**
 *
 * @param value - a number value from a Spotify track
 * @return string - will return a note from the PITCH_CLASS constant array, see more about Pitch Class here (https://en.wikipedia.org/wiki/Pitch_class)
 * @example convertNumberToPitchClass() will returns "", while convertNumberToPitchClass(0) will return "C"
 */
export function convertNumberToPitchClass(value?: number): string {
    if (!value) {
        return '';
    }

    return PITCH_CLASS.find((pitch) => pitch.number === value)?.note || '';
}
