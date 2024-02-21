const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//105 Schema for Item
const ItemSchema = new Schema({
  title: String,
  image: String,
  star: String,
/*   rate: String, */
  description: String,
  email: String,
});

//150 Schema for User
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//first set up Schema, then create Model, then after the Model should be read in index.js
//106 Model

exports.ItemModel = mongoose.model("Item", ItemSchema);
exports.UserModel = mongoose.model("User", UserSchema);
