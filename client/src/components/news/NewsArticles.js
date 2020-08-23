import React, { Fragment, useRef, useEffect } from 'react';
import { Segment, Button, Item, Header, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import NewsArticle from './NewsArticle';
import { capitalizeFirstLetter } from '../../utils';

const NewsArticles = ({
  category = '',
  searchTerm = '',
  loading,
  newsArticles,
  totalResults,
  totalSavedArticles,
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
      {error && <div>{error}</div>}

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
                totalSavedArticles={totalSavedArticles}
              />
            </Segment>
          ))}
      </Item.Group>

      <div ref={resultsEndRef} />

      {newsArticles &&
        newsArticles.length &&
        !loading &&
        page < Math.ceil(totalResults / pageSize) && (
          <Fragment>
            <Button
              fluid
              loading={loading}
              primary
              onClick={() => incrementPageNumber()}
            >
              Load more..
            </Button>
            <Divider clearing />
          </Fragment>
        )}
    </Fragment>
  );
};

NewsArticles.propTypes = {
  category: PropTypes.string,
  searchTerm: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  newsArticles: PropTypes.array.isRequired,
  totalResults: PropTypes.number,
  totalSavedArticles: PropTypes.number,
  error: PropTypes.any,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  saveArticle: PropTypes.func.isRequired,
  deleteSavedArticle: PropTypes.func.isRequired,
  incrementPageNumber: PropTypes.func.isRequired,
};

export default NewsArticles;
