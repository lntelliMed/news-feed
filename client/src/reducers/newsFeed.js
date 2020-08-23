import {
  START_LOADING,
  END_LOADING,
  GET_NEWS_SUCCESS,
  GET_NEWS_FAIL,
  SET_LANGUAGE,
  SET_COUNTRY,
  SET_CATEGORY,
  SET_NEWS_URI,
  INCREMENT_PAGE_NUMBER,
  SET_PAGE_SIZE,
  SET_SEARCH_TERM,
  SET_NEWS_SOURCES,
  SET_NEWS_DOMAINS,
  SET_SEARCH_FROM_DATE,
  SET_SEARCH_TO_DATE,
  SET_NEWS_SORTBY,
  CLEAR_SEARCH_RESULTS,
  SAVE_ARTICLE_SUCCESS,
  GET_SAVED_ARTICLES_SUCCESS,
  DELETE_SAVED_ARTICLE_SUCCESS,
} from '../actions/types';

const intialState = {
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
    savedArticles: [],
  },
  totalResults: 0,
  totalSavedArticles: 0,
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

export default (state = intialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case END_LOADING:
      return {
        ...state,
        loading: false,
      };
    case GET_NEWS_SUCCESS:
      const categorizedNewsArray = [
        ...state.news[action.data.category],
        ...action.data.articles,
      ];
      return {
        ...state,
        loading: false,
        error: null,
        totalResults: action.data.totalResults,
        news: {
          ...state.news,
          [action.data.category]: categorizedNewsArray,
        },
      };
    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        loading: false,
        error: null,
        news: {
          ...state.news,
          searchResults: [],
        },
      };
    case GET_NEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error || 'Something went wrong',
      };
    case SET_LANGUAGE: {
      return {
        ...state,
        params: { ...state.params, language: action.language },
      };
    }
    case SET_COUNTRY: {
      return {
        ...state,
        params: { ...state.params, country: action.country },
      };
    }
    case SET_CATEGORY: {
      return {
        ...state,
        params: { ...state.params, category: action.category },
      };
    }
    case SET_NEWS_URI: {
      return {
        ...state,
        params: { ...state.params, uri: action.uri },
      };
    }
    case INCREMENT_PAGE_NUMBER: {
      return {
        ...state,
        params: { ...state.params, page: state.params.page + 1 },
      };
    }
    case SET_PAGE_SIZE: {
      return {
        ...state,
        params: { ...state.params, pageSize: action.pageSize },
      };
    }
    case SET_SEARCH_TERM: {
      return {
        ...state,
        params: { ...state.params, q: action.searchTerm },
      };
    }
    case SET_NEWS_SOURCES: {
      return {
        ...state,
        params: {
          ...state.params,
          sources: [...state.params.sources, ...action.sources],
        },
      };
    }
    case SET_NEWS_DOMAINS: {
      return {
        ...state,
        params: {
          ...state.params,
          sources: [...state.params.domains, ...action.domains],
        },
      };
    }
    case SET_SEARCH_FROM_DATE: {
      return {
        ...state,
        params: { ...state.params, from: action.from },
      };
    }
    case SET_SEARCH_TO_DATE: {
      return {
        ...state,
        params: { ...state.params, from: action.to },
      };
    }
    case SET_NEWS_SORTBY: {
      return {
        ...state,
        params: { ...state.params, from: action.sortBy },
      };
    }
    case GET_SAVED_ARTICLES_SUCCESS:
      // const savedArticlesArray = [
      //   ...state.news[action.data.category],
      //   ...action.data.articles,
      // ];
      return {
        ...state,
        loading: false,
        error: null,
        totalSavedArticles: action.data.totalSavedArticles,
        news: {
          ...state.news,
          // [action.data.category]: savedArticlesArray,
          [action.data.category]: action.data.articles,
        },
      };

    case SAVE_ARTICLE_SUCCESS:
      const postAdditionSavedArticlesArray = [
        ...state.news[action.data.category],
        action.data.article,
      ];
      return {
        ...state,
        loading: false,
        error: null,
        totalSavedArticles: action.data.totalSavedArticles,
        news: {
          ...state.news,
          [action.data.category]: postAdditionSavedArticlesArray,
        },
      };

    case DELETE_SAVED_ARTICLE_SUCCESS:
      const postDeletionSavedArticlesArray = [
        ...state.news[action.data.category].filter(
          (article) => article.id !== action.data.articleId
        ),
      ];
      return {
        ...state,
        loading: false,
        error: null,
        totalSavedArticles: action.data.totalSavedArticles,
        news: {
          ...state.news,
          [action.data.category]: postDeletionSavedArticlesArray,
        },
      };
    default:
      return state;
  }
};
