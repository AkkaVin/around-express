const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        //return /\d{3}-\d{3}-\d{4}/.test(v);
        //TODO
        return true;
      },
      message: props => `${props.value} is not a valid URL!`
    },
  },
  owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      //type: ObjectId,
      required: true,
      //not_work?  default: '6305d797f22c88d72739a295',
  },
  likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      // TODO default value
      default:  []
  }],
  createdAt: {
    type: Date,
    // TODO default value
    default: Date.now
  }
});

const card = mongoose.model("card", cardSchema);

module.exports = card;