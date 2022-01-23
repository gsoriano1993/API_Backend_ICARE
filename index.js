const express = require("express");
const expressValidator = require("express-validator");
const conectarDB = require("./config/db");
const cors = require("cors");

const app = express();

conectarDB();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(expressValidator());

app.use("/api/user", require("./routes/auth"));
app.use("/api/ninio", require("./routes/ninio"));
app.use("/api/vacuna", require("./routes/vacunas"));
app.use("/api/control", require("./routes/control"));
app.use("/api/percent", require("./routes/percent"));

app.get("/", (req, res) => {
  res.json({ mensaje: "My Auth Api Rest" });
});

const PORT = process.env.PORT || 8005;
app.listen(PORT, () => {
  console.log(`Tu servidor está corriendo en el puerto: ${PORT}`);
});
