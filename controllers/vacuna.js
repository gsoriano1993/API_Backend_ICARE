const Vacuna = require("../models/Vacuna");
const Ninio = require("../models/Ninio");

exports.createVacine = async (req, res) => {
  try {
    const { paciente } = req.body;

    const ninio = await Ninio.findById(paciente);

    try {
      const vacuna = new Vacuna(req.body);

      const vacunaSaved = await vacuna.save();

      ninio.vacunas = ninio.vacunas.concat(vacunaSaved._id);
      await ninio.save();

      res.json({vacuna: vacunaSaved});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getVacunas = async (req, res) => {
  try {
    const { paciente } = req.body;
    
    const vacunas = await Vacuna.find({ paciente });

    res.json({vacunas})
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
