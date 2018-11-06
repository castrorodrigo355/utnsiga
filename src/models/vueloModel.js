const {Schema, mongoose} = require("../database/database")
const User = require("./usuarioModel")

var vuelo = new Schema({ 
        partida: String,
        destino: String, 
        duracion: Number,
        usuario: { type: Schema.ObjectId, ref: "User" }
        })

var Vuelo = mongoose.model("Vuelo", vuelo)

module.exports = Vuelo