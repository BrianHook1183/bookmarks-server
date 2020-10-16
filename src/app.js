require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const winston = require('winston');
const { bookmarks } = require('./STORE');
const { NODE_ENV } = require('./config');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(express.json());
app.use(cors());

//  Winston  Error Logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'info.log' })
  ]
});
if (NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
//  Winston  Error Logging

// Authorization middleware
app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    // log statement when this failure happens
    logger.error(`Unauthorized request to path: ${req.path}`);
    return res.status(401).json({ error: 'Unauthorized request' });
  };
  next();
});
// Authorization middleware

app.get('/', (req, res) => {
  res.send('Hello, world!');
});








app.get('/bookmarks', (req, res) => {
  res.json(bookmarks);
});

app.get('/bookmarks/:id', (req, res) => {
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

app.post('/bookmarks', (req, res) => {
  //TODO: validate book mark
  //TODO: generate a UUID
  //TODO: add to bookmarks list
  res.json(req.body);
});

app.delete('/bookmarks/:id', (req, res) => {
  const { id } = req.params;
  //TODO: validate book mark
  //TODO: add to bookmarks list
  res.send(`deletes the bookmark with the given ID: ${id}`);
});




















app.use((error, req, res, next) => {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});


module.exports = app;