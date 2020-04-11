const express = require('express');
const Miembros = require('../modelos/miembrosModel');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Funcion get todos
router.get('/', async(req, res) => {
    const miembros = await Miembros.find();
    res.send(miembros);
});

// Funcion get documentos activos
router.get('/activo', async(req, res) => {
    const miembros = await Miembros.find({ estado: true });
    res.send(miembros);
});

// Funcion get segun la cuenta TODOS
router.get('/cuenta/:cuentas', async(req, res) => {
    const miembros = await Miembros.find({ cuentas: { $eq: req.params.cuentas } });
    if (!miembro) return res.status(404).send('No se encontro ningun documento');
    res.send(miembros);
});

// Funcion get segun la cuenta ACTIVOS
router.get('/activoCuenta/:cuentas', async(req, res) => {
    const miembros = await Miembros.find({ $and: [{ cuentas: { $eq: req.params.cuentas } }, { estado: true }] });
    if (!miembro) return res.status(404).send('No se encontro ningun documento');
    res.send(miembros);
});

// Funcion get por _id unico
router.get('/:_id', async(req, res) => {
    const miembro = await Miembros.findById(req.params._id);
    if (!miembro) return res.status(404).send('No se encontro ningun documento');
    res.send(miembro);
});

// Funcion POST
router.post('/', async(req, res) => {

    const miembro = new Miembros({
        cuentas: req.body.cuentas,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        usuario: req.body.usuario,
        password: req.body.password,
        correo: req.body.correo,
        costoHr: req.body.costoHr,
        perfiles: req.body.perfiles,
        expertis: req.body.expertis,
        estado: req.body.estado
    });
    const result = await miembro.save();
    res.status(201).send(result);
});

// Funcion PUT
router.put('/:_id', async(req, res) => {

    const miembro = await Miembros.findByIdAndUpdate(req.params._id, {
        cuentas: req.body.cuentas,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        usuario: req.body.usuario,
        password: req.body.password,
        correo: req.body.correo,
        costoHr: req.body.costoHr,
        perfiles: req.body.perfiles,
        expertis: req.body.expertis,
        estado: req.body.estado
    }, {
        new: true
    });

    if (!miembro) {
        return res.status(404).send('No se encontro ningun documento');
    }

    res.status(204).send();
});

// Funcion DELETE
router.delete('/:_id', async(req, res) => {
    const miembro = await Miembros.findByIdAndDelete(req.params._id);
    if (!miembro) {
        return res.status(404).send('No se encontro ningun documento para borrar');
    } else {
        res.status(200).send('Miembro borrado');
    }
});

module.exports = router;