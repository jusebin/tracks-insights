import {PITCH_CLASS} from "@/app/constants/pitchClass";

export function convertNumberToPitchClass(value?: number): string {
    if (!value) {
        return '';
    }

    return PITCH_CLASS.find((pitch) => pitch.number === value)?.note || '';
}
