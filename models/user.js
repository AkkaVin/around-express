const mongoose = require("mongoose");
const { URL_REGEXP } = require("../constants");

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
    required: true,
    validate: {
      validator: function(v) {
        // const pattern = new RegExp(/(((http(s)?):\/\/)?(www\.)?)?[a-zA-Z0-9@:%_\-\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, "gi");
        //return pattern.test(v)
        return URL_REGEXP.test(v)
      },
      message: props => `${props.value} is not a valid URL!`
    },
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;