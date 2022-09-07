const User = require('../models/user');

// get user(s) ======================================================================

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error("There is no users");
      error.statusCode = 404;
      error.name = "UsersNotFound"
      throw error;
    })
    .then(users => res.status(200).send({ data: users }))
    .catch((err) => {
      if (err.name === 'UsersNotFound') {
        res.status(err.statusCode).send(err.message)
      } else
        res.status(500).send({
          message: `An error has occurred on the server: ${err.toString()}`
        })
    });
};

module.exports.getUser = (req, res) => {
  // TODO check if id exist
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error("No user found with that id");
      error.statusCode = 404;
      error.name = "UserNotFound";
      throw error;
    })
    .then(user => res.send({ data: user}))
    .catch((err) => {
      if (err.name === 'UserNotFound') {
        res.status(err.statusCode).send(err.message)
      } else
        res.status(500).send({
          message: `An error has occurred on the server: ${err.toString()}`
        })
    });
};
// create user ======================================================================
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(err.message)
      } else
        res.status(500).send({
          message: `An error has occurred on the server: ${err.toString()}`
        })
    });
};

// update user ======================================================================

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate ( req.user._id, { name: name, about: about})
  .orFail(() => {
    const error = new Error("No user found with that id");
    error.statusCode = 404;
    error.name = "UserNotFound";
    throw error;
  })
  .then(user => res.send({ data: user}))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send(err.message)
    }
    if (err.name === 'UserNotFound') {
      res.status(err.statusCode).send(err.message)
    } else
      res.status(500).send({
        message: `An error has occurred on the server: ${err.toString()}`
      })
  });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate ( req.user._id, { avatar: avatar})
  .orFail(() => {
    const error = new Error("No user found with that id");
    error.statusCode = 404;
    error.name = "UserNotFound"
    throw error;
  })
  .then(user => res.send({ data: user}))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send(err.message)
    }
    if (err.name === 'UserNotFound') {
      res.status(err.statusCode).send(err.message)
    } else
      res.status(500).send({
        message: `An error has occurred on the server: ${err.toString()}`
      })
  });
};
