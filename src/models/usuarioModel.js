const {Schema, mongoose} = require("../database/database")

var vuelo = new Schema({
    partida: String,
    destino: String,
    duracion: Number,
});

var usuario = new Schema({
    nombre: String,
    apellido: String,
    celular: String,
    dni: String,
    edad: Number,
    vuelos: [vuelo]
});

var Usuario = mongoose.model("users", usuario)

module.exports = Usuario