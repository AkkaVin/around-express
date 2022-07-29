const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/cards.json');

router.get('/cards', (req, res) => {

  const file = fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {

    if (err) {
      // console.log(err);
        res
          .status(500)
          .send({ message: 'An error has occurred on the server: ' + err.toString() });
        return;
    }

    const cards = JSON.parse(data);
    res.send(cards);
  });

});

module.exports = router;