const mongoose = require("mongoose");

const controlSchema = mongoose.Schema({
  peso: {
    type: String,
    require: false,
  },
  altura: {
    type: String,
    require: false,
  },
  diametroCabeza: {
    type: String,
    require: false,
  },
  observaciones: {
    type: String,
    require: false,
  },
  medicamentosRecetados: {
    type: String,
    require: false,
  },
  estudiosPorHacer: {
    type: String,
    require: false,
  },
  resultados: {
    type: String,
    require: false,
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ninio",
  },
});

module.exports = mongoose.model("Control", controlSchema);
