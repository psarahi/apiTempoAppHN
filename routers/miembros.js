const express = require('express');
const Miembros = require('../modelos/miembrosModel');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Funcion get todos
router.get('/', async(req, res) => {
    try {
        const miembros = await Miembros.find();
        res.send(miembros);
    } catch (error) {
        console.log(error);
        res.status(404).send('no se encontro ningun documento');

    }
});

// Funcion get documentos activos
router.get('/activo', async(req, res) => {
    try {
        const miembros = await Miembros.find({ estado: true });
        res.send(miembros);
    } catch (error) {
        console.log(error);
        res.status(404).send('no se encontro ningun documento');

    }
});

// Funcion get segun la cuenta TODOS
router.get('/cuenta/:cuentas', async(req, res) => {
    try {
        const miembros = await Miembros.find({ cuentas: { $eq: req.params.cuentas } });
        res.send(miembros);
    } catch (error) {
        console.log(error);
        res.status(404).send('no se encontro ningun documento');

    }
});

// Funcion get segun la cuenta ACTIVOS
router.get('/activoCuenta/:cuentas', async(req, res) => {
    try {
        const miembros = await Miembros.find({ $and: [{ cuentas: { $eq: req.params.cuentas } }, { estado: true }] });
        res.send(miembros);
    } catch (error) {
        console.log(error);
        res.status(404).send('no se encontro ningun documento');

    }
});

// Funcion get por _id unico
router.get('/:_id', async(req, res) => {
    try {
        const miembro = await Miembros.findById(req.params._id);
        res.send(miembro);
    } catch (error) {
        console.log(error);
        res.status(404).send('no se encontro ningun documento');

    }
});

// Funcion POST
router.post('/', async(req, res) => {
    try {
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
    } catch (error) {
        console.log(error);
        res.status(404).send('no se encontro ningun documento');

    }
});

// Funcion PUT
router.put('/:_id', async(req, res) => {
    try {
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
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(404).send('no se encontro ningun documento');

    }
});

// Funcion DELETE
router.delete('/:_id', async(req, res) => {
    try {
        const miembro = await Miembros.findByIdAndDelete(req.params._id);
        res.status(200).send('Miembro borrado');

    } catch (error) {
        console.log(error);
        res.status(404).send('no se encontro ningun documento');

    }
});

module.exports = router;