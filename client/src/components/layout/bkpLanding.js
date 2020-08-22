import React, { Fragment, useEffect } from 'react';
import { Segment, Button, Item, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

import {
  getNews,
  setCategory,
  incrementPageNumber,
} from '../../actions/newsFeed';
import NewsArticle from '../news/NewsArticle';
import Spinner from './Spinner';

const Landing = (props) => {
  useEffect(() => {
    const { language, country, uri, page, pageSize, category } = props;
    const requestObj = { language, country, category, uri, page, pageSize };
    props.getNews(requestObj);
  }, [
    props.language,
    props.country,
    props.uri,
    props.page,
    props.pageSize,
    props.category,
  ]);

  const { loading, error, news } = props;
  const data = news[props.category];

  if (loading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <Header as='h2'>Top Headlines - {props.category}</Header>

      <Item.Group divided>
        {data &&
          data.map((item, index) => (
            <Segment key={index}>
              <NewsArticle {...item} />
            </Segment>
          ))}
      </Item.Group>

      {error && <div>{error}</div>}
      {data && data.length && !loading && (
        <Button
          fluid
          loading={props.loading}
          primary
          onClick={() => props.incrementPageNumber()}
        >
          Load more..
        </Button>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  news: state.newsFeed.news,
  loading: state.newsFeed.loading,
  error: state.newsFeed.error,
  language: state.newsFeed.params.language,
  country: state.newsFeed.params.country,
  uri: state.newsFeed.params.uri,
  page: state.newsFeed.params.page,
  pageSize: state.newsFeed.params.pageSize,
  category: state.newsFeed.params.category,
});

const mapDispatchToProps = (dispatch) => ({
  getNews: (language, country, category, uri, page) =>
    dispatch(getNews(language, country, category, uri, page)),
  incrementPageNumber: () => dispatch(incrementPageNumber()),
  setCategory: (category) => dispatch(setCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
