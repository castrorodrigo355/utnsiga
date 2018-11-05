const express = require("express");
// const router = express.Router({mergeParams : true});
const router = express.Router();
const Vuelo = require("../models/vueloModel")
const User = require("../models/usuarioModel")

// CREAR UN VUELO
router.post("/", (req, res) => {
    let data = req.body;
    let vuelo = new Vuelo(data);
    vuelo.save()
        .then(result => res.status(201).json(result))
        .catch(err => res.status(503).json(err));
})

// OBTENER LA LISTA DE VUELOS COMPLETA
router.get("/", (req, res) => {
    Vuelo.find()
        .then(vuelos => res.json (vuelos))
        .catch(err => res.json(err))
})

// OBTENER UN DETERMINADO VUELO MEDIANTE UN "id"
router.get("/:id", (req, res) => {
    Vuelo.findById(req.params.id)
        .then(vuelo => {
            if (vuelo){
                res.json(vuelo)
            } else {
                res.status(404).json({ message: 'not found!'})
            }
        });
})

// OBTENER EL USUARIO DUEŃO
router.get("/api/:idVuelo", (req, res) => {
    Vuelo.findOne({_id : req.params.idVuelo}, (err, vuelo) => {
        err ? res.json(err) : 
        User.findOne({_id : vuelo.usuario}, (error, usuario) => {
            error ? res.json(error) : res.json(usuario)
        })
    })
})

// OBTENER EL USUARIO DUEŃO DE UN VUELO "id"


// // ELIMINAR EL VUELO "id" DE UNA USUARIO
// router.delete("/:idVuelo", (req, res) => {
//     User.findOne({_id: req.params.id}, (err, usuario) => {
//         if(err) res.json(err)
//         usuario.vuelos = usuario.vuelos.filter(unVuelo => unVuelo._id != req.params.idVuelo)
//         usuario.save()
//         res.json({mensaje:"Vuelo eliminado"})
//     })
// })

// // ACTUALIZAR UN VUELO DE UN DETERMINADO USUARIO MEDIANTE UN "id"
// router.put("/:idVuelo", (req, res) => {
//     User.findOne({_id: req.params.id}, (err, usuario) => {
//         if(err) res.json(err);
//         const vuelo = usuario.vuelos.find(unVuelo => unVuelo._id == req.params.idVuelo);
//         vuelo.destino = req.body.destino;
//         vuelo.duracion = req.body.duracion;
        
//         const index = usuario.vuelos.map((unVuelo, i) => {
//             if(unVuelo._id == vuelo._id){
//                 return i
//             }
//         })
//         const posicion = index[0];
//         usuario.vuelos.splice(posicion, vuelo)
//         usuario.save()
//             .then(result => res.status(201).json(result))
//             .catch(err => res.status(503).json(err));
//     })
// })

module.exports = router;