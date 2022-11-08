import { hasAllNullishValues, hasNullishValues } from '..';

describe('hasAllNullishValues', () => {
  it('should return true if all properties are null or undefined', () => {
    expect(
      hasAllNullishValues({
        test: null,
        name: undefined
      })
    ).toBe(true);
  });

  it('should return false if one property is not null', () => {
    expect(
      hasAllNullishValues({
        test: null,
        name: ''
      })
    ).toBe(false);
  });
});

describe('hasNullishValues', () => {
  it('shold return true if one property is null or undefined or emtpy string', () => {
    expect(hasNullishValues({ test: '', name: 'something' })).toBe(true);
  });

  it('should return false if all properties are not null or undefined or empty string', () => {
    expect(hasNullishValues({ test: 'something', name: 'something' })).toBe(
      false
    );
  });
});
