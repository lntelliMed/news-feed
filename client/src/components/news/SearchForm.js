import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Checkbox, Segment, Icon } from 'semantic-ui-react';

import { getNews, incrementPageNumber } from '../../actions/newsFeed';
import { categories as categoryOptions } from '../../data/categories';
import { languages as languageOptions } from '../../data/languages';
import { countries as countryOptions } from '../../data/countries';
import { sources as sourceOptions } from '../../data/sources';
import { domains as domainOptions } from '../../data/domains';
import { sortBy as sortByOptions } from '../../data/sortBy';
import SearchResultsPage from './SearchResultsPage';

const SearchForm = (props) => {
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
  const [advancedSettings, setAdvancedSettings] = useState(false);
  let apiNewsSources;
  if (props.sources && props.sources.length) {
    apiNewsSources = props.sources.map((source) => ({
      key: source.id,
      text: source.name,
      value: source.id,
    }));
  }
  useEffect(() => {
    const requestObj = {
      language: 'en',
      uri: 'sources',
    };
    props.getNews(requestObj);
  }, []);

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

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

  const requestObj = {
    language,
    country,
    category,
    uri: 'everything',
    page: 1,
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
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData['searchTerm'].trim()) {
      return alert('Please enter a search term!');
    }

    props.getNews(requestObj);

    // setFormData({
    //   searchTerm: '',
    //   category: '',
    //   sortBy: '',
    //   from: '',
    //   to: '',
    //   language: '',
    //   country: '',
    //   source: '',
    //   domain: '',
    // });
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
        <Checkbox
          checked={advancedSettings}
          label={`${advancedSettings ? 'Hide' : 'Show'} Advanced Settings`}
          onChange={() => setAdvancedSettings(!advancedSettings)}
          toggle
        />
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
      <SearchResultsPage formData={formData} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  news: state.newsFeed.news,
  searchResults: state.newsFeed.news.searchResults,
  sources: state.newsFeed.news.sources,
  loading: state.newsFeed.loading,
  error: state.newsFeed.error,
  language: state.newsFeed.params.language,
  country: state.newsFeed.params.country,
  uri: state.newsFeed.params.uri,
  page: state.newsFeed.params.page,
});

const mapDispatchToProps = (dispatch) => ({
  getNews: (language, country, category, uri, page) =>
    dispatch(getNews(language, country, category, uri, page)),
  incrementPageNumber: () => dispatch(incrementPageNumber()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
