const padTo2Digits = (value: number): string => {
  return value.toString().padStart(2, '0');
};

/**
 *
 * @param ms - a duration expressed in ms
 * @return string: a string from his duration readable by a human
 * @example convertMsToMinutes(180000) will return "3:00"
 */
export function convertMsToMinutes(ms: number): string {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 60;

    return `${hours > 0 ? padTo2Digits(hours) + ':' : ''}${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}
