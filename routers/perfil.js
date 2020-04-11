const express = require('express');
const Perfil = require('../modelos/perfilModel');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Funcion get todos
router.get('/', async(req, res) => {
    const perfiles = await Perfil.find();
    res.send(perfiles);
});

// Funcion get documentos activos
router.get('/activo', async(req, res) => {
    const perfiles = await Perfil.find({ estado: true });
    res.send(perfiles);
});

// Funcion get por _id unico
router.get('/:_id', async(req, res) => {
    const perfil = await Perfil.findById(req.params._id);
    if (!perfil) return res.status(404).send('No se encontro ningun documento');
    res.send(perfil);
});

// Funcion POST
router.post('/', async(req, res) => {

    const perfil = new Perfil({
        nombre: req.body.nombre,
        estado: req.body.estado
    });
    const result = await perfil.save();
    res.status(201).send(result);
});

// Funcion PUT
router.put('/:_id', async(req, res) => {

    const perfil = await Perfil.findByIdAndUpdate(req.params._id, {
        nombre: req.body.nombre,
        estado: req.body.estado
    }, {
        new: true
    });

    if (!perfil) {
        return res.status(404).send('No se encontro ningun documento');
    }

    res.status(204).send();
});

// Funcion DELETE
router.delete('/:_id', async(req, res) => {
    const perfil = await Perfil.findByIdAndDelete(req.params._id);
    if (!perfil) {
        return res.status(404).send('No se encontro ningun documento para borrar');
    } else {
        res.status(200).send('Perfil borrado');
    }
});

module.exports = router;