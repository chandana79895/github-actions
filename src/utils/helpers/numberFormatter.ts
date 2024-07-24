//converts number to string with 2 decimal places and comma separated after every 3 digits
export const numberFormatter = (value: number): string => {
  return parseFloat((value).toFixed(2)).toLocaleString('en-US');
}

//converts formatted string to number
export const stringToNumber = (value: string): number => {
  return parseFloat(value.replace(/,/g, ''));
}