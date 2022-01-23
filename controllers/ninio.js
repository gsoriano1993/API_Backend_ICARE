const Ninio = require("../models/Ninio");
const User = require("../models/User");

exports.createNinio = async (req, res) => {
  try {
    const hijo = new Ninio(req.body);

    hijo.padre = req.user.id;

    const user = await User.findById(req.user.id);

    try {
      const hijoSaved = await hijo.save();

      user.ninios = user.ninios.concat(hijoSaved._id);
      await user.save();

      res.json(hijoSaved);
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getNinios = async (req, res) => {
  try {
    const hijos = await Ninio.find({padre: req.user.id}).populate("padre", {
      nombre: 1,
    }).populate("vacunas", {
      nombreVacuna: 1,
    }).populate("control", {
      peso: 1,
    });
    res.json({hijos});
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
