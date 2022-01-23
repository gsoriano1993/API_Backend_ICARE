const mongoose = require("mongoose");

const vacunaSchema = mongoose.Schema({
  nombreVacuna: {
    type: String,
    require: false,
    min: 6,
    max: 255,
  },
  fechaAplicacion: {
    type: String,
    require: false,
    min: 6,
    max: 255,
  },
  dosis: {
    type: String,
    require: false,
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ninio",
  },
});
module.exports = mongoose.model("Vacuna", vacunaSchema);
