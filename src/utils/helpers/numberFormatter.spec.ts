import { numberFormatter, stringToNumber } from "../../utils/helpers/numberFormatter";

describe('numberFormatter',() => {
  describe('number to comma separated string', () => {
    it('should convert number to string with 2 decimal places and comma separated after every 3 digits', () => {
      expect(numberFormatter(123456.789)).toBe('123,456.79');
      expect(numberFormatter(1000)).toBe('1,000');
      expect(numberFormatter(0)).toBe('0');
    });

    it('should handle negative numbers', () => {
      expect(numberFormatter(-123456.789)).toBe('-123,456.79');
    });
  });

  describe('stringToNumber', () => {
    it('should convert formatted string to number', () => {
      expect(stringToNumber('123,456.79')).toBe(123456.79);
      expect(stringToNumber('1,000')).toBe(1000);
      expect(stringToNumber('0')).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(stringToNumber('-123,456.79')).toBe(-123456.79);
    });
  });
})