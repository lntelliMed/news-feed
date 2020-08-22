import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Icon } from 'semantic-ui-react';

import { getNews, clearSearchResults } from '../../actions/newsFeed';
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
  searchResults,
  totalResults,
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

  useEffect(() => {
    const requestObj = {
      language: 'en',
      uri: 'sources',
    };
    getNews(requestObj);
  }, []);

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
    searchAllNews();
    setAdvancedSettings(false);
  };

  useEffect(() => {
    searchAllNews();
  }, [page]);

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
      {searchResults && searchResults.length > 0 && (
        <NewsArticles
          searchTerm={searchTerm}
          loading={loading}
          newsArticles={searchResults}
          totalResults={totalResults}
          error={error}
          page={page}
          pageSize={pageSize}
          incrementPageNumber={() => setPage(page + 1)}
        />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  sources: state.newsFeed.news.sources,
  searchResults: state.newsFeed.news.searchResults,
  totalResults: state.newsFeed.totalResults,
  loading: state.newsFeed.loading,
  error: state.newsFeed.error,
});

const mapDispatchToProps = (dispatch) => ({
  getNews: (requestObj) => dispatch(getNews(requestObj)),
  clearSearchResults: () => dispatch(clearSearchResults()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchNewsPage);
