import formatDate from "./dateFormatter";

describe('formatDate function', () => {
  it('should return undefined when date is undefined', () => {
    expect(formatDate(undefined)).toBeUndefined();
  });

  it('should return date in YYYY/MM/DD format', () => {
    expect(formatDate('2022-12-31', 'YYYY/MM/DD')).toBe('2022/12/31');
  });

  it('should return date in MM/DD/YYYY format', () => {
    expect(formatDate('2022-12-31', 'MM/DD/YYYY')).toBe('12/31/2022');
  });

  it('should return date in DD/MM/YYYY format', () => {
    expect(formatDate('2022-12-31', 'DD/MM/YYYY')).toBe('31/12/2022');
  });

  it('should return date in default format when format is not provided', () => {
    expect(formatDate('2022-12-31')).toBe('2022/12/31');
  });
});