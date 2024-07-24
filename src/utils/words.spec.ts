import { getWords } from "./words";

describe('getWords', () => {
  it('should return the correct value for existing keys', () => {
    expect(getWords("English")).toBe("000");
    expect(getWords("location")).toBe("035");
    expect(getWords("platinum")).toBe("069");
  });

  it('should return undefined for non-existing keys', () => {
    expect(getWords("nonExistingKey")).toBeUndefined();
  });

  it('should respect case sensitivity', () => {
    expect(getWords("english")).toBeUndefined(); // Assuming "english" is not a key and "English" is.
  });

  it('should correctly handle keys with special characters', () => {
    expect(getWords("日本語")).toBe("001");
  });

  it('should return undefined for an empty string key', () => {
    expect(getWords("")).toBeUndefined();
  });
});