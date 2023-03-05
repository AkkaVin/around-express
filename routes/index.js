const router = require('express').Router();

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');

router.use('/', usersRoutes, cardsRoutes);

module.exports = router;
