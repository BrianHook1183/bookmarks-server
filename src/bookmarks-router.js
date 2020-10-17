const express = require('express');
const { isWebUri } = require('valid-url');
const { v4: uuid } = require('uuid');
const { bookmarks } = require('./STORE');
const logger = require('./logger');
const bookmarksRouter = express.Router();

// for endpoint: /bookmarks
bookmarksRouter
  .route('/bookmarks')
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post((req, res) => {
    const { title, url, description, rating } = req.body;
    if (!title) {
      logger.error('Title is required');
      return res
        .status(400)
        .send('Title is required');
    };
    if (!url) {
      logger.error('Url is required');
      return res
        .status(400)
        .send('Url is required');
    };
    if (!description) {
      logger.error('Description is required');
      return res
        .status(400)
        .send('Description is required');
    };
    if (!rating) {
      logger.error('Rating is required');
      return res
        .status(400)
        .send('Rating is required');
    };
    if (rating < 0 || rating > 5 || !Number.isInteger(rating)) {
      logger.error('Rating must be between 0 and 5');
      return res
        .status(400)
        .send('Rating must be between 0 and 5');
    };
    if (!isWebUri(url)) {
      logger.error('URL is invalid');
      return res
        .status(400)
        .send('URL is invalid');
    };

    const id = uuid();
    const bookmark = {
      id,
      title,
      url,
      description,
      rating
    };

    bookmarks.push(bookmark);

    logger.info(`Bookmark with id ${id} created`);
    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${id}`)
      .json(bookmark);
  });

// for endpoint: /bookmarks/:id
bookmarksRouter
  .route('/bookmarks/:id')
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = bookmarks.find(b => b.id == id);
    // error if ID not found
    if (!bookmark) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res
        .status(404)
        .send('Bookmark Not Found');
    }
    res.json(bookmark);
  })
  .delete((req, res) => {
    const { id } = req.params;
    const bookmarkIndex = bookmarks.findIndex(b => b.id == id);
    console.log(bookmarkIndex);

    if (bookmarkIndex === -1) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res
        .status(404)
        .send('Bookmark Not Found');
    };

    bookmarks.splice(bookmarkIndex, 1);

    logger.info(`Bookmark with id ${id} deleted.`);
    res
      .status(204)
      .end();
  });

module.exports = bookmarksRouter;