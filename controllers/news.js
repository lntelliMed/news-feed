const config = require('config');
const NewsAPI = require('newsapi');

const NEWS_API_KEY = process.env.NEWS_API_KEY || config.get('newsApiKey');

const newsApi = new NewsAPI(NEWS_API_KEY);

exports.getTopHeadlines = async (req, res, next) => {
  // ***** SAMPLE TOP-HEADLINES REQUEST ******* //
  // To query /v2/top-headlines:
  // All options passed to topHeadlines are
  // optional, but you need to include at least one
  // of them:
  // ***************************************** //
  // {
  // sources: 'bbc-news,the-verge',
  // q: 'bitcoin',
  // category: 'business',
  // language: 'en',
  // country: 'us'
  // }
  // ***************************************** //
  try {
    const {
      country,
      category,
      language,
      sources,
      q,
      page,
      pageSize,
      domains,
      from,
      to,
      sortBy,
    } = req.query;

    const response = await newsApi.v2.topHeadlines({
      country,
      category,
      language,
      sources,
      q,
      page,
      pageSize,
      domains,
      from,
      to,
      sortBy,
    });
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getEverything = async (req, res, next) => {
  // ******  SAMPLE EVERYTHING REQUEST ******* //
  // To query /v2/everything
  // You must include at least one q, source, or
  // domain:
  // ***************************************** //
  // {
  //   q: 'bitcoin',
  //   sources: 'bbc-news,the-verge',
  //   domains: 'bbc.co.uk, echcrunch.com',
  //   from: '2017-12-01',
  //   to: '2017-12-12',
  //   language: 'en',
  //   sortBy: 'relevancy',
  //   page: 2
  // }
  // ***************************************** //
  try {
    const {
      country,
      category,
      language,
      sources,
      q,
      page,
      pageSize,
      domains,
      from,
      to,
      sortBy,
    } = req.query;

    const response = await newsApi.v2.everything({
      country,
      category,
      language,
      sources,
      q,
      page,
      pageSize,
      domains,
      from,
      to,
      sortBy,
    });
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getSources = async (req, res, next) => {
  // *******   SAMPLE SOURCES REQUEST  ******* //
  // To query sources
  // All options are optional
  // ***************************************** //
  // {
  //   category: 'technology',
  //   language: 'en',
  //   country: 'us'
  // }
  // ***************************************** //
  try {
    const {
      country,
      category,
      language,
      sources,
      q,
      page,
      pageSize,
      domains,
      from,
      to,
      sortBy,
    } = req.query;

    const response = await newsApi.v2.sources({
      country,
      category,
      language,
      sources,
      q,
      page,
      pageSize,
      domains,
      from,
      to,
      sortBy,
    });
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
