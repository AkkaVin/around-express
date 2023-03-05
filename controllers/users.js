const User = require('../models/user');
const AppError = require('../errors/application-error');

const {
  NOT_FOUND_CODE,
  NOT_FOUND_MESSAGE,
  INVALID_DATA_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../constants');

// get user(s) ======================================================================

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR_CODE).send({
        message: `${INTERNAL_SERVER_ERROR_MESSAGE}${err.toString()}`,
      });
    });
};

module.exports.getUser = (req, res) => {
  // TODO check if id exist
  User.findById(req.params.id)
    .orFail(() => {
      throw new AppError(NOT_FOUND_CODE, `${NOT_FOUND_MESSAGE} user with id = ${req.params.id}`, 'UserNotFound');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA_CODE).send({
          message: err.message,
        });
      }
      if (err.name === 'UserNotFound') {
        res.status(err.statusCode).send({
          message: err.message,
        });
      } else {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
          message: `${INTERNAL_SERVER_ERROR_MESSAGE}${err.toString()}`,
        });
      }
    });
};

// create user ======================================================================

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA_CODE).send({
          message: err.message,
        });
      } else {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
          message: `${INTERNAL_SERVER_ERROR_MESSAGE}${err.toString()}`,
        });
      }
    });
};

// update user ======================================================================

const updateOptions = { runValidators: true, new: true };
// TODO check update AVATAR
const catchFindByIdAndUpdateErrors = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(INVALID_DATA_CODE).send({
      message: err.message,
    });
  } else
  if (err.name === 'UserNotFound') {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(INTERNAL_SERVER_ERROR_CODE).send({
      message: `${INTERNAL_SERVER_ERROR_MESSAGE}${err.toString()}`,
    });
  }
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, updateOptions)
    .orFail(() => {
      throw new AppError(NOT_FOUND_CODE, `${NOT_FOUND_MESSAGE} user with id = ${req.user._id}`, 'UserNotFound');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => catchFindByIdAndUpdateErrors(err, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, updateOptions)
    .orFail(() => {
      throw new AppError(NOT_FOUND_CODE, `${NOT_FOUND_MESSAGE} user with id = ${req.user._id}`, 'UserNotFound');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => catchFindByIdAndUpdateErrors(err, res));
};
