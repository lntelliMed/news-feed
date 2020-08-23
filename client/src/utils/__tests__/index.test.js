import { capitalizeFirstLetter } from '../index';

describe('capitalizeFirstLetter', () => {
  it('capitalizes the first letter of first passed string', () => {
    const word = capitalizeFirstLetter('some string');
    expect(word).toEqual('Some string');
  });

  it('capitalizes the default value if original string is empty', () => {
    const word = capitalizeFirstLetter('', 'default value');
    expect(word).toEqual('Default value');
  });

  it('returns an empty string if no values were provided', () => {
    const word = capitalizeFirstLetter();
    expect(word).toEqual('');
  });
});
