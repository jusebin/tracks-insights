export function getStringArrayValues(array: string[]) {
    let values = '';

    array.forEach((value, index) => {
       values += `${value}${index === array.length - 1 ? '' : ','}`;
    });

    return values;
}
