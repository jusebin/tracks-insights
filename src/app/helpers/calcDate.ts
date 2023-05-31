export interface TimeData {
    secs: number,
    mins: number;
    hours: number;
    days: number;
}

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
