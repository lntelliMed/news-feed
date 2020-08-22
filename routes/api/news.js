const express = require('express');
const config = require('config');
const NewsAPI = require('newsapi');

const router = express.Router();
const newsApi = new NewsAPI(config.get('newsApiKey'));

router.get('/v2/top-headlines', async (req, res) => {
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
});

router.get('/v2/everything', async (req, res) => {
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
});

router.get('/v2/sources', async (req, res) => {
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
});
module.exports = router;
