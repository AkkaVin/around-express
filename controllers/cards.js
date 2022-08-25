const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
      .populate('owner')
      // .populate()
      .then(cards => res.send({ data: cards }))
      .catch(() => res.status(500)
        .send({ message: `An error has occurred on the server: ${err.toString()}` }));
};

module.exports.deleteCard = (req, res) => {
  // TODO check if id exist
  Card.findByIdAndDelete(req.params.cardId)
  .then(card => res.send({ data: card}))
  .catch(() => res.status(500)
    .send({ message: `An error has occurred on the server: ${err.toString()}` }));
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
    .catch(() => res.status(500)
    .send({ message: `An error has occurred on the server: ${err.toString()}` }));
};
