const router = require('express').Router();
// const fs = require('fs/promises');
// const path = require('path');
const User = require('../models/user');


// const dataPath = path.join(__dirname, '../data/users.json');

router.get('/users', (req, res) => {
  User.find({})
      .then(users => res.send({ data: users }))
      .catch(() => res.status(500)
        .send({ message: `An error has occurred on the server: ${err.toString()}` }));
});

router.get('/users/:id', (req, res) => {
  // TODO check if id exist
  User.findById(req.params.id)
      .then(user => res.send({ data: user}))
      .catch(() => res.status(500)
        .send({ message: `An error has occurred on the server: ${err.toString()}` }));
});

router.post ('/users', (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500)
    .send({ message: `An error has occurred on the server: ${err.toString()}` }));
})

module.exports = router;
