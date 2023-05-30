const padTo2Digits = (value: number): string => {
  return value.toString().padStart(2, '0');
};

export function convertMsToMinutes(ms: number): string {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}
