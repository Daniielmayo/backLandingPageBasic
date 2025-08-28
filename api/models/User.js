const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  admin: {
    type: Boolean,
    require: false,
    immutable: true,
  },
});

const User = model("User", UserSchema);

module.exports = User;
