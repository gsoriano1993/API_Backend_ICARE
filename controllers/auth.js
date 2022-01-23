const User = require("../models/User");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const dotenv = require("dotenv");
dotenv.config();
const { sendEmail } = require("../services/sendEmail");

const schemaRegister = Joi.object({
  nombre: Joi.string().min(6).max(255).required(),
  dni: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(6).required(),
  telefono: Joi.string().min(8).max(1024).required(),
});

// Esquema del login
const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(6).required(),
});

exports.login = async (req, res) => {
  // Validaciones de login
  const { error } = schemaLogin.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Validaciond e existencia
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

  // Validacion de password en la base de datos
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Constraseña invalida" });

  const payload = {
    user: {
      id: user.id
    }
  }

  // Creando token
  const token = jwt.sign(
    payload,
    process.env.TOKEN_SECRET || "token secreto"
  );

  res.json({ token });
};

exports.register = async (req, res) => {
  const { error } = schemaRegister.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const isDNIExist = await User.findOne({ dni: req.body.dni });
  if (isDNIExist) {
    return res.status(400).json({ error: "DNI ya registrado" });
  }

  try {
    const user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      }
    };

    const token = jwt.sign(
      payload,
      process.env.TOKEN_SECRET || "token secreto"
    );

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.forgotPassword = (req, res) => {
  if (!req.body) return res.status(400).json({ message: "No request body" });
  if (!req.body.email)
    return res.status(400).json({ message: "No Email in request body" });

  console.log("forgot password finding user with that email");
  const { email } = req.body;
  console.log("signin req.body", email);
  // find the user based on email
  User.findOne({ email }, (err, user) => {
    // if err or no user
    if (err || !user)
      return res.status("401").json({
        error: "User with that email does not exist!",
      });

    // generate a token with user id and secret
    const token = jwt.sign(
      { name: user.name, id: user._id },
      process.env.TOKEN_SECRET || "token secreto"
    );

    // email data
    const emailData = {
      from: "noreply@node-react.com",
      to: email,
      subject: "Password Reset Instructions",
      text: `Please use the following link to reset your password: http://localhost:3000/reset-password/${token}`,
      html: `<p>Please use the following link to reset your password:</p> <p>http://localhost:3000/reset-password/${token}</p>`,
    };

    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        return res.json({ message: err });
      } else {
        sendEmail(emailData);
        return res.status(200).json({
          message: `Email has been sent to ${email}. Follow the instructions to reset your password.`,
        });
      }
    });
  });
};

exports.resetPassword = async (req, res) => {
  let { resetPasswordLink, newPassword } = req.body;

  await User.findOne({ resetPasswordLink }, async (err, user) => {
    // if err or no user
    if (err || !user)
      return res.status("401").json({
        error: "Invalid Link!",
      });

    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(newPassword, salt);

    const updatedFields = {
      password: newPassword,
      resetPasswordLink: "",
    };

    user = _.extend(user, updatedFields);

    await user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({
        message: `Great! Now you can login with your new password.`,
      });
    });
  });
};

exports.users = async (req, res) => {
  const users = await User.find({})
    .select("-__v")
    .populate({
      path: "ninios",
      select: "-padre -__v",
      populate: { path: "vacunas control", select: "-paciente -__v" },
    });
  res.json(users);
};

// Endpoint a probar
exports.authUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un Error" });
  }
};

exports.user = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const user = await User.findById({ _id })
      .select("-__v")
      .populate({
        path: "ninios",
        select: "-padre -__v",
        populate: { path: "vacunas control", select: "-paciente -__v" },
      });

    res.json({ user });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};
