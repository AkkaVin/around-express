const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/users.json');


router.get('/users', (req, res) => {

  const file = fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {

    if (err) {
    // console.log(err);
      res
        .status(500)
        .send({ message: 'An error has occurred on the server: ' + err.toString() });
      return;
    }

    const users = JSON.parse(data);
    res.send(users);
  });

});

router.get('/users/:id', (req, res) => {
  const file = fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {

    if (err) {
      // console.log(err);
        res
          .status(500)
          .send({ message: 'An error has occurred on the server: ' + err.toString() });
        return;
    }

    const users = JSON.parse(data);
    const user = users.filter(user =>
      user._id === req.params.id
    )

    if (user.length == 0) {
      res.status(404).send({ message: "User ID not found" });
      return;
     }
    res.send(user);
  });

});

module.exports = router;