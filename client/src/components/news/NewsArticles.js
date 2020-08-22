import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Item, Header } from 'semantic-ui-react';

import {
  getNews,
  setCategory,
  incrementPageNumber,
} from '../../actions/newsFeed';
import NewsItem from './NewsArticle';
import Spinner from '../layout/Spinner';

const SearchResultsPage = (props) => {
  const resultsEndRef = useRef(null);

  const scrollToBottom = () => {
    resultsEndRef &&
      resultsEndRef.current &&
      props.page > 1 &&
      resultsEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [props.searchResults]);
  useEffect(() => {
    const {
      searchTerm,
      category,
      sortBy,
      from,
      to,
      language,
      country,
      source,
      domain,
    } = props.formData;

    const requestObj = {
      language,
      country,
      category,
      uri: 'everything',
      page: props.page,
      pageSize: 5,
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
    props.getNews(requestObj);
  }, [props.page]);

  const { loading, error, news } = props;

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className={'vertical'}>
          {props.page &&
            props.pageSize &&
            props.totalResults &&
            props.formData.searchTerm && (
              <Header as='h2'>
                {`Displaying results 1-${Math.min(
                  props.page * props.pageSize,
                  props.totalResults
                )} out of ${props.totalResults} for ${
                  props.formData.searchTerm
                }`}
                <br></br>
                <br></br>
              </Header>
            )}
          <Item.Group divided>
            {props.searchResults &&
              props.searchResults.map((item, index) => (
                <Segment>
                  <NewsItem {...item} key={index} />
                </Segment>
              ))}
          </Item.Group>

          {error && <div>{error}</div>}
          <div ref={resultsEndRef} />

          {props.searchResults &&
            props.searchResults.length &&
            !loading &&
            props.page < Math.ceil(props.totalResults / props.pageSize) && (
              <Button
                fluid
                loading={props.loading}
                primary
                onClick={() => props.incrementPageNumber()}
              >
                Load more..
              </Button>
            )}
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  searchResults: state.newsFeed.news.searchResults,
  totalResults: state.newsFeed.totalResults,
  loading: state.newsFeed.loading,
  error: state.newsFeed.error,
  // language: state.newsFeed.params.language,
  // country: state.newsFeed.params.country,
  // uri: state.newsFeed.params.uri,
  page: state.newsFeed.params.page,
  pageSize: state.newsFeed.params.pageSize,
  // pageSize: state.newsFeed.params.pageSize,
  // category: state.newsFeed.params.category,
  // q: state.newsFeed.params.q,
});

const mapDispatchToProps = (dispatch) => ({
  getNews: (language, country, category, uri, page) =>
    dispatch(getNews(language, country, category, uri, page)),
  incrementPageNumber: () => dispatch(incrementPageNumber()),
  setCategory: (category) => dispatch(setCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage);
