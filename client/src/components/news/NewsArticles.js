import React, { Fragment, useRef, useEffect } from 'react';
import { Segment, Button, Item, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import NewsArticle from './NewsArticle';
const NewsArticles = ({
  category = '',
  searchTerm = '',
  loading,
  newsArticles,
  totalResults,
  error,
  page,
  pageSize,
  incrementPageNumber,
}) => {
  const resultsEndRef = useRef(null);
  const scrollToBottom = () => {
    if (resultsEndRef && resultsEndRef.current && page > 1) {
      resultsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(scrollToBottom, [newsArticles]);

  return (
    <Fragment>
      {category && <Header as='h2'>Top Headlines - {category}</Header>}
      {page && pageSize && totalResults && (searchTerm || category) && (
        <Header as='h3'>
          {`Displaying results 1-${Math.min(
            page * pageSize,
            totalResults
          )} out of ${totalResults} for ${searchTerm || category}`}
          <br></br>
          <br></br>
        </Header>
      )}
      <Item.Group divided>
        {newsArticles &&
          newsArticles.length > 0 &&
          newsArticles.map((item, index) => (
            <Segment key={index}>
              <NewsArticle {...item} />
            </Segment>
          ))}
      </Item.Group>

      {error && <div>{error}</div>}
      <div ref={resultsEndRef} />

      {newsArticles &&
        newsArticles.length &&
        !loading &&
        page < Math.ceil(totalResults / pageSize) && (
          <Button
            fluid
            loading={loading}
            primary
            onClick={() => incrementPageNumber()}
          >
            Load more..
          </Button>
        )}
    </Fragment>
  );
};

NewsArticles.propTypes = {
  category: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  newsArticles: PropTypes.array.isRequired,
  totalResults: PropTypes.number.isRequired,
  error: PropTypes.object,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  incrementPageNumber: PropTypes.func.isRequired,
};

export default NewsArticles;
