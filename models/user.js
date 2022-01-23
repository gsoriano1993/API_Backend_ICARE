const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  dni: {
    type: String,
    require: true,
    minlength: 6,
  },
  email: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    require: true,
    min: 6,
    max: 6,
  },
  resetPasswordLink: {
    type: String,
    default: "",
    require: false,
  },
  telefono: {
    type: String,
    require: true,
    min: 8,
    max: 255,
  },
  ninios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ninio",
  }]
});

module.exports = mongoose.model("User", userSchema);
