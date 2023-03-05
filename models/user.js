const mongoose = require('mongoose');
const { URL_REGEXP } = require('../constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    // required: true,
    validate: {
      validator(v) {
        return URL_REGEXP.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
    default: 'https://c.tenor.com/10Zdx_RXqgcAAAAM/programming-crazy.gif',
  },
});

const user = mongoose.model('user', userSchema);

module.exports = user;
