const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      const error = new Error("There is no cards");
      error.statusCode = 404;
      error.name = "CardsNotFound";
      throw error;
    })
    .populate('owner')
    .then(cards => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'CardsNotFound') {
        res.status(err.statusCode).send(err.message)
      } else
        res.status(500).send({
          message: `An error has occurred on the server: ${err.toString()}`
        })
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
  .orFail(() => {
    const error = new Error("No card found with that id");
    error.statusCode = 404;
    error.name = "CardNotFound";
    throw error;
  })
  .then(card => res.send({ data: card}))
  .catch((err) => {
    if (err.name === 'CardNotFound') {
      res.status(err.statusCode).send(err.message)
    } else
      res.status(500).send({
        message: `An error has occurred on the server: ${err.toString()}`
      })
  });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  // const owner = '6305d797f22c88d72739a295';
  Card.create({
    name,
    link,
    owner: req.user._id,
    // likes: [owner, owner]
  })
    .then(card => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(err.message)
      } else
        res.status(500).send({
          message: `An error has occurred on the server: ${err.toString()}`
        })
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
  .orFail(() => {
    const error = new Error("No card found with that id");
    error.statusCode = 404;
    error.name = "CardNotFound";
    throw error;
  })
  .then(card => res.send({ data: card}))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send(err.message)
    }
    if (err.name === 'CardNotFound') {
      res.status(err.statusCode).send(err.message)
    } else
      res.status(500).send({
        message: `An error has occurred on the server: ${err.toString()}`
      })
  });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // remove _id from the array
  { new: true },)
  .orFail(() => {
    const error = new Error("No card found with that id");
    error.statusCode = 404;
    error.name = "CardNotFound";
    throw error;
  })
  .then(card => res.send({ data: card}))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send(err.message)
    }
    if (err.name === 'CardNotFound') {
      res.status(err.statusCode).send(err.message)
    } else
      res.status(500).send({
        message: `An error has occurred on the server: ${err.toString()}`
      })
  });
}