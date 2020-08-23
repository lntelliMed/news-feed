import React, { Fragment, useRef, useEffect } from 'react';
import { Segment, Button, Item, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import NewsArticle from './NewsArticle';
import { capitalizeFirstLetter } from '../../utils';

const NewsArticles = ({
  category = '',
  searchTerm = '',
  loading,
  newsArticles,
  totalResults,
  error,
  page,
  pageSize,
  saveArticle,
  deleteSavedArticle,
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
      {category && (
        <Header as='h2'>
          Top Headlines - {capitalizeFirstLetter(category)}
        </Header>
      )}
      {page && pageSize && totalResults && (searchTerm || category) && (
        <Header as='h3'>
          {`Displaying results 1-${Math.min(
            page * pageSize,
            totalResults
          )} out of ${totalResults} for ${capitalizeFirstLetter(
            searchTerm || category
          )}`}
          <br></br>
          <br></br>
        </Header>
      )}
      <Item.Group divided>
        {newsArticles &&
          newsArticles.length > 0 &&
          newsArticles.map((article, index) => (
            <Segment key={index}>
              <NewsArticle
                {...article}
                saveArticle={saveArticle}
                deleteSavedArticle={deleteSavedArticle}
              />
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
  category: PropTypes.string,
  searchTerm: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  newsArticles: PropTypes.array.isRequired,
  totalResults: PropTypes.number.isRequired,
  error: PropTypes.any,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  saveArticle: PropTypes.func.isRequired,
  deleteSavedArticle: PropTypes.func.isRequired,
  incrementPageNumber: PropTypes.func.isRequired,
};

export default NewsArticles;
