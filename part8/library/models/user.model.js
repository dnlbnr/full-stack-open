const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  favouriteGenre: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserFSOPart8", schema);
