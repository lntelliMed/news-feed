import axios from 'axios';

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
} from './types';

export const startLoading = () => ({
  type: START_LOADING,
});

export const endLoading = () => ({
  type: END_LOADING,
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  language,
});

export const setCountry = (country) => ({
  type: SET_COUNTRY,
  country,
});

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  category,
});

export const setNewsUri = (uri) => ({
  type: SET_NEWS_URI,
  uri,
});

export const incrementPageNumber = () => ({
  type: INCREMENT_PAGE_NUMBER,
});

export const setPageSize = (pageSize) => ({
  type: SET_PAGE_SIZE,
  pageSize,
});

export const setSearchTerm = (searchTerm) => ({
  type: SET_SEARCH_TERM,
  searchTerm,
});

export const setNewsSources = (sources) => ({
  type: SET_NEWS_SOURCES,
  sources,
});

export const setNewsDomains = (domains) => ({
  type: SET_NEWS_DOMAINS,
  domains,
});

export const setSearchFromDate = (from) => ({
  type: SET_SEARCH_FROM_DATE,
  from,
});

export const setSearchToDate = (to) => ({
  type: SET_SEARCH_TO_DATE,
  to,
});

export const setNewsSortBy = (sortBy) => ({
  type: SET_NEWS_SORTBY,
  sortBy,
});

export const getNewsSuccess = (articles, category, totalResults) => {
  const data = { articles, category, totalResults };
  return {
    type: GET_NEWS_SUCCESS,
    data,
  };
};

export const getNewsFailure = (error) => ({
  type: GET_NEWS_FAIL,
  error: error.message,
});

export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
});

export const getNews = (requestObj) => (dispatch) => {
  dispatch(startLoading());
  return axios
    .get(buildUrl(requestObj))
    .then(checkResponseForErrors)
    .then((res) => res.data)
    .then((data) => {
      const { articles, sources, totalResults } = data;
      const { page, category, uri } = requestObj;
      if (requestObj.uri === 'top-headlines') {
        dispatch(getNewsSuccess(articles, category, totalResults));
      } else if (uri === 'everything') {
        if (page && page === 1) {
          dispatch(clearSearchResults());
        }
        dispatch(getNewsSuccess(articles, 'searchResults', totalResults));
      } else if (uri === 'sources') {
        dispatch(getNewsSuccess(sources, 'sources', totalResults));
      }
      return data.articles;
    })
    .catch((error) => dispatch(getNewsFailure(error)));
};

export const buildUrl = (requestObj) => {
  const {
    uri,
    language,
    page,
    pageSize,
    country,
    category,
    searchTerm,
    sources,
    domains,
    from,
    to,
    sortBy,
  } = requestObj;
  let API_URL = `/api/news/v2/${uri}?language=${language || 'en'}`;

  if (requestObj.page) {
    API_URL = `${API_URL}&page=${page}`;
  }

  if (pageSize) {
    API_URL = `${API_URL}&pageSize=${pageSize}`;
  }

  if (country) {
    API_URL = `${API_URL}&country=${country}`;
  }
  if (category) {
    API_URL = `${API_URL}&category=${category}`;
  }
  if (searchTerm) {
    API_URL = `${API_URL}&q=${searchTerm}`;
  }

  if (sources && sources.length) {
    API_URL = `${API_URL}&sources=${sources.join(',')}`;
  }

  if (domains && domains.length) {
    API_URL = `${API_URL}&domains=${domains.join(',')}`;
  }

  if (from) {
    API_URL = `${API_URL}&from=${from}`;
  }
  if (to) {
    API_URL = `${API_URL}&to=${to}`;
  }
  if (sortBy) {
    API_URL = `${API_URL}&sortBy=${sortBy}`;
  }
  return API_URL;
};

export const checkResponseForErrors = (response) => {
  if (response.status !== 200) {
    throw new Error(
      response.statusText || response.message || 'Something went wrong'
    );
  }
  return response;
};

export const getSavedArticlesSuccess = (articles, category, totalResults) => {
  const data = { articles, category, totalResults };
  return {
    type: GET_SAVED_ARTICLES_SUCCESS,
    data,
  };
};

export const getSavedArticles = () => (dispatch) => {
  let articles = [];
  const savedArticles = JSON.parse(localStorage.getItem('articles'));
  if (savedArticles && savedArticles.length) {
    articles = savedArticles;
  }
  return dispatch(
    getSavedArticlesSuccess(articles, 'savedArticles', articles.length)
  );
};

export const saveArticleSuccess = (article, category, totalResults) => {
  const data = { article, category, totalResults };
  return {
    type: SAVE_ARTICLE_SUCCESS,
    data,
  };
};

export const saveArticle = (article) => (dispatch) => {
  let articles = [];
  const savedArticles = JSON.parse(localStorage.getItem('articles'));
  if (savedArticles && savedArticles.length) {
    articles = savedArticles;
  }
  articles.push(article);
  localStorage.setItem('employees', JSON.stringify(articles));
  return dispatch(
    saveArticleSuccess(article, 'savedArticles', articles.length)
  );
};

export const deleteSavedArticleSuccess = (
  articleId,
  category,
  totalResults
) => {
  const data = { articleId, category, totalResults };
  return {
    type: DELETE_SAVED_ARTICLE_SUCCESS,
    data,
  };
};

export const deleteSavedArticle = (articleId) => (dispatch) => {
  let articles = [];
  const savedArticles = JSON.parse(localStorage.getItem('articles'));
  if (savedArticles && savedArticles.length > 0) {
    articles = savedArticles.filter((article) => article.id !== articleId);
    localStorage.setItem('employees', JSON.stringify(articles));
  }

  return dispatch(
    deleteSavedArticleSuccess(articleId, 'searchResults', articles.length)
  );
};
