import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getNews,
  saveArticle,
  deleteSavedArticle,
} from '../../actions/newsFeed';
import Spinner from './Spinner';
import NewsArticles from '../news/NewsArticles';

const LandingPage = ({
  getNews,
  saveArticle,
  deleteSavedArticle,
  category,
  news,
  totalResults,
  error,
  loading,
}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState('us');
  const [uri, setUri] = useState('top-headlines');

  useEffect(() => {
    const requestObj = {
      language,
      country,
      // use default category in case there is a delay with value retrieval from Navbar!
      category: category || 'general',
      uri,
      page: page,
      pageSize,
    };
    getNews(requestObj);
  }, [page, category, language, country, uri, pageSize]);

  const newsArticles = news[category];

  if (loading) {
    return <Spinner />;
  }
  return (
    <NewsArticles
      category={category}
      loading={loading}
      newsArticles={newsArticles}
      totalResults={totalResults}
      error={error}
      page={page}
      pageSize={pageSize}
      saveArticle={saveArticle}
      deleteSavedArticle={deleteSavedArticle}
      incrementPageNumber={() => setPage(page + 1)}
    />
  );
};

LandingPage.propTypes = {
  getNews: PropTypes.func.isRequired,
  saveArticle: PropTypes.func.isRequired,
  deleteSavedArticle: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  news: PropTypes.any,
  totalResults: PropTypes.number,
  error: PropTypes.any,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  news: state.newsFeed.news,
  totalResults: state.newsFeed.totalResults,
  loading: state.newsFeed.loading,
  error: state.newsFeed.error,
  category: state.newsFeed.params.category,
});

const mapDispatchToProps = (dispatch) => ({
  getNews: (requestObj) => dispatch(getNews(requestObj)),
  saveArticle: (article) => dispatch(saveArticle(article)),
  deleteSavedArticle: (articleId) => dispatch(deleteSavedArticle(articleId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
