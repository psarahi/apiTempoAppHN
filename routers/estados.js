const express = require('express');
const Estados = require('../modelos/estadoModel');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Funcion get todos
router.get('/', async(req, res) => {
    try {
        const estados = await Estados.find();
        res.send(estados);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion POST
router.post('/', async(req, res) => {
    try {
        const estado = new Estados({
            nombre: req.body.nombre,
        });
        const result = await estado.save();
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se pudo registrar el documento');

    }
});

module.exports = router;