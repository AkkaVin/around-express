const Card = require('../models/card');
const {
  NOT_FOUND_CODE,
  INVALID_DATA_CODE,
  INTERNAL_SERVER_ERROR_CODE,
} = require('../constants');

// get card(s) ======================================================================

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      const error = new Error('There is no cards');
      error.statusCode = NOT_FOUND_CODE;
      error.name = 'CardsNotFound';
      throw error;
    })
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'CardsNotFound') {
        res.status(err.statusCode).send(err.message);
      } else {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
          message: `An error has occurred on the server: ${err.toString()}`,
        });
      }
    });
};

// delete card ======================================================================

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.statusCode = NOT_FOUND_CODE;
      error.name = 'CardNotFound';
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CardNotFound') {
        res.status(err.statusCode).send(err.message);
      } else {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
          message: `An error has occurred on the server: ${err.toString()}`,
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
    // likes: [owner, owner]
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA_CODE).send(err.message);
      } else {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
          message: `An error has occurred on the server: ${err.toString()}`,
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
      const error = new Error('No card found with that id');
      error.statusCode = NOT_FOUND_CODE;
      error.name = 'CardNotFound';
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA_CODE).send(err.message);
      }
      if (err.name === 'CardNotFound') {
        res.status(err.statusCode).send(err.message);
      } else {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
          message: `An error has occurred on the server: ${err.toString()}`,
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
      const error = new Error('No card found with that id');
      error.statusCode = NOT_FOUND_CODE;
      error.name = 'CardNotFound';
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA_CODE).send(err.message);
      }
      if (err.name === 'CardNotFound') {
        res.status(err.statusCode).send(err.message);
      } else {
        res.status(INTERNAL_SERVER_ERROR_CODE).send({
          message: `An error has occurred on the server: ${err.toString()}`,
        });
      }
    });
};
