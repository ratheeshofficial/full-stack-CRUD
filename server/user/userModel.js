const mongoose = require("mongoose");
const { Schema } = mongoose;

const loginSchema = new Schema({
  email: String,
  password: String,
});

const registerInfo = mongoose.model("register", loginSchema);
module.exports = registerInfo;
