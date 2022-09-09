const User = require("../models/user");
const {
  NOT_FOUND_CODE,
  INVALID_DATA_CODE,
  INTERNAL_SERVER_ERROR_CODE,
} = require("../constants");

const mongoose = require('mongoose');


// get user(s) ======================================================================

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch( err => {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
          message: `An error has occurred on the server: ${err.toString()}`,
        });
    });
};

module.exports.getUser = (req, res) => {
  // TODO check if id exist
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error("No user found with that id");
      error.statusCode = NOT_FOUND_CODE;
      error.name = "UserNotFound";
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA_CODE).send(err.message);
      }
      if (err.name === "UserNotFound") {
        res.status(err.statusCode).send(err.message);
      } else
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
          message: `An error has occurred on the server: ${err.toString()}`,
        });
    });
};
// create user ======================================================================
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(INVALID_DATA_CODE).send(err.message);
      } else
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
          message: `An error has occurred on the server: ${err.toString()}`,
        });
    });
};

// update user ======================================================================

const updateOptions = { runValidators: true, new: true };

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name: name, about: about }, updateOptions)
    .orFail(() => {
      const error = new Error("No user found with that id");
      error.statusCode = NOT_FOUND_CODE;
      error.name = "UserNotFound";
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(INVALID_DATA_CODE).send(err.message);
      }
      if (err.name === "UserNotFound") {
        res.status(err.statusCode).send(err.message);
      } else
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
          message: `An error has occurred on the server: ${err.toString()}`,
        });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar: avatar }, updateOptions)
    .orFail(() => {
      const error = new Error("No user found with that id");
      error.statusCode = NOT_FOUND_CODE;
      error.name = "UserNotFound";
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(INVALID_DATA_CODE).send(err.message);
      }
      if (err.name === "UserNotFound") {
        res.status(err.statusCode).send(err.message);
      } else
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
          message: `An error has occurred on the server: ${err.toString()}`,
        });
    });
};
