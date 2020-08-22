import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getNews } from '../../actions/newsFeed';
import Spinner from '../layout/Spinner';
import TestComp from './NewsArticles';

const SearchResultsPage = ({
  getNews,
  searchResults,
  totalResults,
  loading,
  error,
  formData: {
    searchTerm,
    category,
    sortBy,
    from,
    to,
    language,
    country,
    source,
    domain,
  },
}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [uri, setUri] = useState('everything');

  useEffect(() => {
    const requestObj = {
      language,
      country,
      category,
      uri,
      page,
      pageSize,
      searchTerm,
      from,
      to,
      sortBy,
    };
    if (source) {
      requestObj.sources = [source];
    }
    if (domain) {
      requestObj.domains = [domain];
    }
    getNews(requestObj);
  }, [page]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <TestComp
      searchTerm={searchTerm}
      loading={loading}
      newsArticles={searchResults}
      totalResults={totalResults}
      error={error}
      page={page}
      pageSize={pageSize}
      incrementPageNumber={() => setPage(page + 1)}
    />
  );
};

const mapStateToProps = (state) => ({
  searchResults: state.newsFeed.news.searchResults,
  totalResults: state.newsFeed.totalResults,
  loading: state.newsFeed.loading,
  error: state.newsFeed.error,
});

const mapDispatchToProps = (dispatch) => ({
  getNews: (requestObj) => dispatch(getNews(requestObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage);
