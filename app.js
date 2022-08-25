const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb'
  // , {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
  // }
);
const db_connect = mongoose.connection;

db_connect.on("error", console.error.bind(console, "connection error: "));
db_connect.once("open", function () {
  console.log("Connected successfully");
});
// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/aroundb');
// }


// const User = require('./models/user');
// const Card = require('./models/card');

// User.create({
// name: "sss",
// about: "lalala",
// avatar: "https://www.example.com/"
// })
// .then(u => {
//   console.log(u);
//   console.log(u._id);
//   Card.create ({
//     name: "cardName",
//     link: "http://example.com/go/even/deeper/",
//     owner:  u._id,
//     likes: [
//       '63032f74ad10c0de5e02b7f7',
//       '63032f7d7f0029aa57727551'
//     ],
//     // date as default
//   })
//     //.populate('owner')
//     .then (
//       c => console.log(c)
//     )
//     .catch ( e => console.error(e))
//   //res.send({ data: film })
// })
//.catch(() => res.status(500).send({ message: 'Error' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6305d797f22c88d72739a295' // paste the _id of the test user created in the previous step
  };

  next();
});

app.use('/', usersRoutes);
app.use('/', cardsRoutes);

app.use('/', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
