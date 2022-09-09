const express = require('express');
const process = require('process');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');
const db_connect = mongoose.connection;

db_connect.on("error", console.error.bind(console, "connection error: "));
db_connect.once("open", function () {
  console.log("Connected successfully");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6305d797f22c88d72739a295'
  };
  next();
});

app.use('/', usersRoutes);
app.use('/', cardsRoutes);

app.use('/', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin} ${err.name} with the message ${err.message} was not handled. Pay attention to it!`);
});


app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
