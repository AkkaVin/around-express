const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error("There is no users");
      error.statusCode = 404;
      throw error;
    })
    .then(users => res.send({ data: users }))
    .catch((err) => res.status(500)
      .send({ message: `An error has occurred on the server: ${err.toString()}` }));
};

module.exports.getUser = (req, res) => {
  // TODO check if id exist
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error("No user found with that id");
      error.statusCode = 404;
      throw error;
    })
    .then(user => res.send({ data: user}))
    .catch((err) => res.status(500)
      .send({ message: `An error has occurred on the server: ${err.toString()}` }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => res.status(500)
    .send({ message: `An error has occurred on the server: ${err.toString()}` }));
};