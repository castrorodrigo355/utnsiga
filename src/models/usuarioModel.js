const {Schema, mongoose} = require("../database/database")

var usuario = new Schema({
    nombre: String,
    apellido: String,
    celular: String,
    dni: String,
    edad: Number
});

var Usuario = mongoose.model("User", usuario)

module.exports = Usuario