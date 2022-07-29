const express = require('express');

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use('/', usersRoutes);
app.use('/', cardsRoutes);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
    // if everything works fine, the console will show which port the application is listening to
    console.log(`App listening at port ${PORT}`);
  })