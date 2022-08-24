const router = require('express').Router();
const {
  getCards,
  deleteCard,
  createCard
} = require('../controllers/cards');

router.get('/cards', getCards);

router.delete('/cards/:cardId', deleteCard);

router.post ('/cards', createCard);

module.exports = router;
