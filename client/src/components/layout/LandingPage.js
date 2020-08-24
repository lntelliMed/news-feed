import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getNews,
  incrementPageNumber,
  saveArticle,
  deleteSavedArticle,
} from '../../actions/newsFeed';
import Spinner from './Spinner';
import NewsArticles from '../news/NewsArticles';
// import { categories } from '../../data/categories';

const LandingPage = React.memo(
  ({
    getNews,
    page,
    incrementPageNumber,
    saveArticle,
    deleteSavedArticle,
    category,
    news,
    totalResults,
    totalSavedArticles,
    error,
    loading,
  }) => {
    // const initializePageNumbers = () => {
    //   const pageNumbersConfig = {};
    //   for (let category of categories) {
    //     pageNumbersConfig[category.key] = 1;
    //   }
    //   return pageNumbersConfig;
    // };

    // const [page, setPage] = useState(initializePageNumbers());
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
        // page: page[category] || 1,
        page,
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
        totalSavedArticles={totalSavedArticles}
        error={error}
        // page={page[category] || 1}
        page={page}
        pageSize={pageSize}
        saveArticle={saveArticle}
        deleteSavedArticle={deleteSavedArticle}
        incrementPageNumber={incrementPageNumber}
        // incrementPageNumber={() =>
        //   setPage({ ...page, [category]: page[category] + 1 })
        // }
      />
    );
  }
);

LandingPage.propTypes = {
  getNews: PropTypes.func.isRequired,
  incrementPageNumber: PropTypes.func.isRequired,
  saveArticle: PropTypes.func.isRequired,
  deleteSavedArticle: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  news: PropTypes.any,
  totalResults: PropTypes.number,
  totalSavedArticles: PropTypes.number,
  error: PropTypes.any,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  news: state.newsFeed.news,
  totalResults: state.newsFeed.totalResults,
  totalSavedArticles: state.newsFeed.totalSavedArticles,
  loading: state.newsFeed.loading,
  error: state.newsFeed.error,
  category: state.newsFeed.params.category,
  page: state.newsFeed.params.page,
});

const mapDispatchToProps = (dispatch) => ({
  getNews: (requestObj) => dispatch(getNews(requestObj)),
  incrementPageNumber: () => dispatch(incrementPageNumber()),
  saveArticle: (article) => dispatch(saveArticle(article)),
  deleteSavedArticle: (articleId) => dispatch(deleteSavedArticle(articleId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
