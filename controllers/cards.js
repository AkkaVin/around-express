const Card = require('../models/card');
const AppError = require('../errors/application-error');
const {
  NOT_FOUND_CODE,
  NOT_FOUND_MESSAGE,
  INVALID_DATA_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../constants');

// get card(s) ======================================================================

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      throw new AppError(NOT_FOUND_CODE, `${NOT_FOUND_MESSAGE} cards`, 'CardsNotFound');
    })
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'CardsNotFound') {
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

// delete card ======================================================================

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      throw new AppError(NOT_FOUND_CODE, `${NOT_FOUND_MESSAGE} card with id = ${req.params.cardId}`, 'CardNotFound');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CardNotFound') {
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

// create card ======================================================================

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  // const owner = '6305d797f22c88d72739a295';
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.send({ data: card }))
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

// update card ======================================================================

const updateOptions = { runValidators: true, new: true };

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    updateOptions,
  )
    .orFail(() => {
      throw new AppError(NOT_FOUND_CODE, `${NOT_FOUND_MESSAGE} card with id = ${req.params.cardId}`, 'CardNotFound');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(INVALID_DATA_CODE).send({
          message: err.message,
        });
      } else
      if (err.name === 'CardNotFound') {
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

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    updateOptions,
  )
    .orFail(() => {
      throw new AppError(NOT_FOUND_CODE, `${NOT_FOUND_MESSAGE} card with id = ${req.params.cardId}`, 'CardNotFound');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(INVALID_DATA_CODE).send({
          message: err.message,
        });
      } else
      if (err.name === 'CardNotFound') {
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
