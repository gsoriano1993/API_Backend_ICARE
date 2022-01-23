const username = "gsoriano";
const password = "Uade2021.";
const cluster = "ClusterGS";
const dbname = "iCare";
const mongoose = require("mongoose");
const uri = `mongodb+srv://${username}:${password}@${cluster}.2ddvq.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const conectarDB = async () => {
  try {
    await mongoose.connect(uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("BBDD conectada");
  } catch (error) {
    console.log(error);
    process.exit(1); //Detiene la app en caso de Error
  }
};

module.exports = conectarDB;
