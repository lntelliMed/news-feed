const express = require('express');

const newsController = require('../../controllers/news');

const router = express.Router();
router.get('/v2/top-headlines', newsController.getTopHeadlines);
router.get('/v2/everything', newsController.getEverything);
router.get('/v2/sources', newsController.getSources);

module.exports = router;
