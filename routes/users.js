const router = require('express').Router();
const fs = require('fs/promises');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

router.get('/users', (req, res) => {
  fs.readFile(dataPath, { encoding: 'utf-8' })
    .then((users) => res.send({ data: JSON.parse(users) }))
    .catch((err) => res
      .status(500)
      .send({ message: `An error has occurred on the server: ${err.toString()}` }));
});

router.get('/users/:id', (req, res) => {
  fs.readFile(dataPath, { encoding: 'utf-8' })
    .then((data) => {
      const users = JSON.parse(data);
      const user = users.filter((u) => u._id === req.params.id);
      if (user.length === 0) {
        res.status(404).send({ message: 'User ID not found' });
        return;
      }
      res.send(user);
    })
    .catch((err) => res
      .status(500)
      .send({ message: `An error has occurred on the server: ${err.toString()}` }));
});

module.exports = router;
