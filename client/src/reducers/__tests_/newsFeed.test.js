import newsFeedReducer from '../newsFeed';
import { SET_CATEGORY } from '../../actions/types';

// TODO: Complete testing other actions..

let initialState;

beforeEach(() => {
  initialState = {
    news: {
      business: [],
      entertainment: [],
      general: [],
      health: [],
      science: [],
      sports: [],
      technology: [],

      sources: [],
      searchResults: [],
    },
    totalResults: 0,
    loading: true,
    error: {},
    params: {
      language: 'en',
      category: '',
      country: '',
      uri: 'top-headlines',
      page: 1,
      pageSize: 5,
      q: '',
      sources: [],
      domains: [],
      from: '',
      to: '',
      sortBy: '',
    },
  };
});

it('handles actions of type SET_CATEGORY', () => {
  const action = {
    type: SET_CATEGORY,
    category: 'business',
  };
  const newState = newsFeedReducer(initialState, action);
  expect(newState.params.category).toEqual('business');
});

it('handles action with unknown type', () => {
  const newState = newsFeedReducer(initialState, { type: 'ALKAFDSJLKAFD' });
  expect(newState.params.category).toEqual('');
});
