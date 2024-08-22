// here we create wats inside the database

const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, require: true , unique: true},
  email: { type: String, require: true ,unique: true},
  password: { type: String, require: true },
  createdOn: { type: String, default : Date.now},
});

const User = mongoose.model("user-auth", userSchema);
module.exports = User;
