import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Icon, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import {
  getNews,
  clearSearchResults,
  saveArticle,
  deleteSavedArticle,
} from '../../actions/newsFeed';
import { categories as categoryOptions } from '../../data/categories';
import { languages as languageOptions } from '../../data/languages';
import { countries as countryOptions } from '../../data/countries';
import { sources as sourceOptions } from '../../data/sources';
import { domains as domainOptions } from '../../data/domains';
import { sortBy as sortByOptions } from '../../data/sortBy';
import NewsArticles from '../news/NewsArticles';

const SearchNewsPage = ({
  sources,
  getNews,
  clearSearchResults,
  searchResults,
  totalResults,
  totalSavedArticles,
  saveArticle,
  deleteSavedArticle,
  loading,
  error,
}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [uri, setUri] = useState('everything');
  const [advancedSettings, setAdvancedSettings] = useState(false);

  const [formData, setFormData] = useState({
    searchTerm: '',
    category: '',
    sortBy: '',
    from: '',
    to: '',
    language: '',
    country: '',
    source: '',
    domain: '',
  });

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
  } = formData;

  // Initialize sources dropdown!
  useEffect(() => {
    const requestObj = {
      language: 'en',
      uri: 'sources',
    };
    getNews(requestObj);
  }, [getNews]);

  useEffect(() => {
    if (searchTerm) {
      searchAllNews();
    }
  }, [page]);

  let apiNewsSources;
  if (sources && sources.length) {
    apiNewsSources = sources.map((source) => ({
      key: source.id,
      text: source.name,
      value: source.id,
    }));
  }

  const clearForm = () => {
    setFormData({
      searchTerm: '',
      category: '',
      sortBy: '',
      from: '',
      to: '',
      language: '',
      country: '',
      source: '',
      domain: '',
    });
    clearSearchResults();
    setPage(1);
  };

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const searchAllNews = () => {
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
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      return alert('Please enter a search term!');
    }
    clearSearchResults();
    setPage(1);
    searchAllNews();
    setAdvancedSettings(false);
  };

  return (
    <Fragment>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            name='searchTerm'
            value={formData['searchTerm']}
            onChange={handleChange}
            fluid
            label='Search News'
            required
            placeholder='Search News...'
          />
        </Form.Group>
        <Form.Button fluid>
          <Icon name='search' />
          Search News..
        </Form.Button>
        <br></br>

        <Form.Group widths='equal'>
          <Form.Checkbox
            checked={advancedSettings}
            label={`${advancedSettings ? 'Hide' : 'Show'} Advanced Settings`}
            onChange={() => setAdvancedSettings(!advancedSettings)}
            toggle
          />
          <Icon
            size='large'
            name='remove'
            color='grey'
            inverted
            onClick={clearForm}
            style={{ cursor: 'pointer' }}
          />
        </Form.Group>

        <br></br>
        <br></br>
        {advancedSettings && (
          <Segment>
            <Form.Group widths='equal'>
              <Form.Select
                fluid
                label='Source'
                options={apiNewsSources || sourceOptions}
                placeholder='Source'
                name='source'
                value={formData['source']}
                onChange={handleChange}
              />{' '}
              <Form.Select
                fluid
                label='Domain'
                options={domainOptions}
                placeholder='Domain'
                name='domain'
                value={formData['domain']}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                label='From'
                placeholder='From Date (e.g. 2020-08-21)'
                name='from'
                value={formData['from']}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                label='To'
                placeholder='To Date (e.g. 2020-08-29)'
                name='to'
                value={formData['to']}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Select
                fluid
                label='Language'
                options={languageOptions}
                placeholder='Language'
                name='language'
                value={formData['language']}
                onChange={handleChange}
              />
              <Form.Select
                fluid
                label='Sort By'
                options={sortByOptions}
                placeholder='Sort By'
                name='sortBy'
                value={formData['sortBy']}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Select
                disabled
                fluid
                label='Category'
                options={categoryOptions}
                placeholder='Category'
                name='category'
                value={formData['category']}
                onChange={handleChange}
              />
              <Form.Select
                disabled
                fluid
                label='Country'
                options={countryOptions}
                placeholder='Country'
                name='country'
                value={formData['country']}
                onChange={handleChange}
              />
            </Form.Group>
          </Segment>
        )}
      </Form>
      {searchResults && searchResults.length > 0 ? (
        <NewsArticles
          searchTerm={searchTerm}
          loading={loading}
          newsArticles={searchResults}
          totalResults={totalResults}
          totalSavedArticles={totalSavedArticles}
          error={error}
          page={page}
          pageSize={pageSize}
          saveArticle={saveArticle}
          deleteSavedArticle={deleteSavedArticle}
          incrementPageNumber={() => setPage(page + 1)}
        />
      ) : (
        <Header as='h3'>
          No results to display. Please enter a valid search criteria, then
          click on the Search News button..
        </Header>
      )}
    </Fragment>
  );
};

SearchNewsPage.propTypes = {
  getNews: PropTypes.func.isRequired,
  clearSearchResults: PropTypes.func.isRequired,
  sources: PropTypes.array.isRequired,
  searchResults: PropTypes.array,
  totalResults: PropTypes.number,
  totalSavedArticles: PropTypes.number,
  saveArticle: PropTypes.func.isRequired,
  deleteSavedArticle: PropTypes.func.isRequired,
  error: PropTypes.any,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  sources: state.newsFeed.news.sources,
  searchResults: state.newsFeed.news.searchResults,
  totalResults: state.newsFeed.totalResults,
  totalSavedArticles: state.newsFeed.totalSavedArticles,
  loading: state.newsFeed.loading,
  error: state.newsFeed.error,
});

const mapDispatchToProps = (dispatch) => ({
  getNews: (requestObj) => dispatch(getNews(requestObj)),
  clearSearchResults: () => dispatch(clearSearchResults()),
  saveArticle: (article) => dispatch(saveArticle(article)),
  deleteSavedArticle: (articleId) => dispatch(deleteSavedArticle(articleId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchNewsPage);
