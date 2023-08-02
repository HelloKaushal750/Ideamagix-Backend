const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  category:{type:String, default:"Instructor",enum:["Admin","Instructor"]}
});

const UserModel = mongoose.model("users", UserSchema);


module.exports = {UserModel};