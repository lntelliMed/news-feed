import { setCategory } from '../newsFeed';
import { SET_CATEGORY } from '../types';

// TODO: Complete testing other actions..

describe('setCategory', () => {
  it('has the correct type', () => {
    const action = setCategory();
    expect(action.type).toEqual(SET_CATEGORY);
  });

  it('has the correct payload', () => {
    const action = setCategory('New Category');
    expect(action.category).toEqual('New Category');
  });
});
