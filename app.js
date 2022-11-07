const express = require('express');
const process = require('process');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const {
  NOT_FOUND_CODE,
  LIMITER_CONFIG,
} = require('./constants');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');
const dbConnect = mongoose.connection;

// eslint-disable-next-line no-console
dbConnect.on('error', console.error.bind(console, 'connection error: '));
dbConnect.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('Connected successfully');
});

const limiter = rateLimit(LIMITER_CONFIG);

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use((req, res, next) => {
  req.user = {
    _id: '6305d797f22c88d72739a295',
  };
  next();
});

app.use('/', usersRoutes);
app.use('/', cardsRoutes);

app.use('/', (req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Requested resource not found' });
});

process.on('uncaughtException', (err, origin) => {
  // eslint-disable-next-line no-console
  console.log(`${origin} ${err.name} with the message ${err.message} was not handled. Pay attention to it!`);
});

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
