const express = require('express');
const Cuenta = require('../modelos/cuentasModel');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Funcion get todos
router.get('/', async(req, res) => {
    const cuentas = await Cuenta.find()
        .sort({ fechaRegistro: -1 });
    res.send(cuentas);
});

// Funcion get documentos activos
router.get('/activo', async(req, res) => {
    const cuentas = await Cuenta.find({ estado: true })
        .sort({ fechaRegistro: -1 });
    res.send(cuentas);
});

// Funcion get por _id unico
router.get('/:_id', async(req, res) => {
    const cuenta = await Cuenta.findById(req.params._id);
    if (!cuenta) return res.status(404).send('No se encontro ningun documento');
    res.send(cuenta);
});

// Funcion POST
router.post('/', async(req, res) => {

    const cuenta = new Cuenta({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        usuario: req.body.usuario,
        password: req.body.password,
        empresa: req.body.empresa,
        lugar: req.body.lugar,
        perfiles: req.body.perfiles,
        estado: req.body.estado
    });
    const result = await cuenta.save();
    res.status(201).send(result);
});

// Funcion PUT
router.put('/:_id', async(req, res) => {

    const cuenta = await Cuenta.findByIdAndUpdate(req.params._id, {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        usuario: req.body.usuario,
        password: req.body.password,
        empresa: req.body.empresa,
        lugar: req.body.lugar,
        perfiles: req.body.perfiles,
        estado: req.body.estado
    }, {
        new: true
    });

    if (!cuenta) {
        return res.status(404).send('No se encontro ningun documento');
    }

    res.status(204).send();
});

// Funcion DELETE
router.delete('/:_id', async(req, res) => {
    const cuenta = await Cuenta.findByIdAndDelete(req.params._id);
    if (!cuenta) {
        return res.status(404).send('No se encontro ningun documento para borrar');
    } else {
        res.status(200).send('Cuenta borrada');
    }
});

module.exports = router;