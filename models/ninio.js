const mongoose = require("mongoose");

const ninioSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: false,
    min: 6,
    max: 255,
  },
  sexo: {
    type: String,
    require: false,
    min: 6,
    max: 255,
  },
  fechaNacimiento: {
    type: String,
    require: false,
    minlength: 6,
  },
  grupoSanguineo: {
    type: String,
    require: false,
    min: 6,
    max: 255,
  },
  alergia: {
    type: [{ type: String }],
    require: false,
    minlength: 6,
  },
  enfermedadesCronicas: {
    type: [{ type: String }],
    require: false,
    min: 8,
    max: 255,
  },
  vacunas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vacuna",
    },
  ],
  padre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  control: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Control",
    },
  ],
  percentiles: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Percent",
      },
    ],
  },
});

module.exports = mongoose.model("Ninio", ninioSchema);
