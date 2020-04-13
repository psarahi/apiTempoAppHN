const express = require('express');
const Perfil = require('../modelos/perfilModel');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Funcion get todos
router.get('/', async(req, res) => {
    try {
        const perfiles = await Perfil.find();
        res.send(perfiles);
    } catch (error) {
        console.log(error);
        res.status(404).send('no se encontro ningun documento');

    }
});

// Funcion get documentos activos
router.get('/activo', async(req, res) => {
    try {
        const perfiles = await Perfil.find({ estado: true });
        res.send(perfiles);
    } catch (error) {
        console.log(error);
        res.status(404).send('no se encontro ningun documento');

    }
});

// Funcion get por _id unico
router.get('/:_id', async(req, res) => {
    try {
        const perfil = await Perfil.findById(req.params._id);
        res.send(perfil);
    } catch (error) {
        console.log(error);
        res.status(404).send('no se encontro ningun documento');

    }
});

// Funcion POST
router.post('/', async(req, res) => {
    try {
        const perfil = new Perfil({
            nombre: req.body.nombre,
            estado: req.body.estado
        });
        const result = await perfil.save();
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send('no se encontro ningun documento');

    }
});

// Funcion PUT
router.put('/:_id', async(req, res) => {
    try {
        const perfil = await Perfil.findByIdAndUpdate(req.params._id, {
            nombre: req.body.nombre,
            estado: req.body.estado
        }, {
            new: true
        });
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(404).send('no se encontro ningun documento');

    }
});

// Funcion DELETE
router.delete('/:_id', async(req, res) => {
    try {
        const perfil = await Perfil.findByIdAndDelete(req.params._id);
        res.status(404).send('No se encontro ningun documento para borrar');
        res.status(200).send('Perfil borrado');

    } catch (error) {
        console.log(error);
        res.status(404).send('no se encontro ningun documento');

    }
});

module.exports = router;