const mongoose = require("mongoose");

const percentSchema = mongoose.Schema({
    percentilCabeza: {
        type: Number,
        require: false
    },
    percentilAltura: {
        type: Number,
        require: false
    },
    percentilPeso: {
        type: Number,
        require: false
    },
    sexo: {
        type: String,
        require: false
    },
    mes: {
        type: Number,
        require: false
    },
    fecha: {
        type: Date,
        require: Date.now()
    },
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ninio"
    }
});
module.exports = mongoose.model("Percent", percentSchema);