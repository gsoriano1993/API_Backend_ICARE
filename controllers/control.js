const Control = require("../models/Control");
const Ninio = require("../models/Ninio");

exports.createControl = async (req, res) => {
  try {
    const { paciente } = req.body;

    const ninio = await Ninio.findById(paciente);

    try {
      const control = new Control(req.body);

      const controlSaved = await control.save();

      ninio.control = ninio.control.concat(controlSaved._id);
      await ninio.save();

      res.json({control: controlSaved});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } catch (err) {
    res.status(500).send("Hubo un error");
  }
};


exports.getControls = async (req, res) => {
  try {
    const { paciente } = req.body;

    const controls = await Control.find({ paciente });
    
    res.json({controls});
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
}