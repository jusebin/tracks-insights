export interface TimeData {
    secs: number,
    mins: number;
    hours: number;
    days: number;
}

/**
 *
 * @param time - a duration expressed in ms
 * @return TimeData - a TimeData object
 * @example calcDate(18000) will return {secs: 0, mins: 3, hours: 0, days: 0}
 */
export function calcDate(time: number): TimeData {
    const secs = Math.floor(Math.abs(time) / 1000);
    const mins = Math.floor(secs / 60);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);

    return {
        secs,
        mins,
        hours,
        days
    }
}
