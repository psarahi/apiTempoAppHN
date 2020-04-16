const express = require('express');
const bcrypt = require('bcrypt');
const Miembros = require('../modelos/miembrosModel');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Funcion get todos
router.get('/', async(req, res) => {
    try {
        const miembros = await Miembros.find()
            .populate('perfiles', 'nombre');
        res.send(miembros);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get documentos activos
router.get('/activo', async(req, res) => {
    try {
        const miembros = await Miembros.find({ estado: true })
            .populate('perfiles', 'nombre');
        res.send(miembros);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get segun la cuenta TODOS
router.get('/cuenta/:cuentas', async(req, res) => {
    try {
        const miembros = await Miembros.find({ cuentas: { $eq: req.params.cuentas } })
            .populate('perfiles', 'nombre');
        res.send(miembros);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get segun la cuenta ACTIVOS
router.get('/activoCuenta/:cuentas', async(req, res) => {
    try {
        const miembros = await Miembros.find({
                $and: [
                    { cuentas: { $eq: req.params.cuentas } },
                    { estado: true }
                ]
            })
            .populate('perfiles', 'nombre');
        res.send(miembros);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get por _id unico
router.get('/:_id', async(req, res) => {
    try {
        const miembro = await Miembros.findById(req.params._id)
            .populate('perfiles', 'nombre');
        res.send(miembro);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion POST
router.post('/', async(req, res) => {
    try {

        let usuario = await Miembros.findOne({
            $or: [
                { usuario: req.body.usuario },
                { correo: req.body.correo }
            ]
        });
        if (usuario) return res.status(400).send('Usurio ya existe');

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const miembro = new Miembros({
            cuentas: req.body.cuentas,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            usuario: req.body.usuario,
            password: hashPassword,
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
        res.status(404).send('No se pudo registrar el documento');

    }
});

// Funcion PUT
router.put('/:_id', async(req, res) => {
    try {
        // let usuario = await Miembros.findById(req.params._id)
        //     .select({
        //         $or: [
        //             { usuario: req.body.usuario },
        //             { correo: req.body.correo }
        //         ]
        //     });

        // ({
        //     $or: [
        //         { usuario: req.body.usuario },
        //         { correo: req.body.correo }
        //     ]
        // }, { _id: { $ne: req.params._id } });

        // if (usuario) return res.status(400).send('Usurio ya existe');

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const miembro = await Miembros.findByIdAndUpdate(req.params._id, {
            cuentas: req.body.cuentas,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            usuario: req.body.usuario,
            password: hashPassword,
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
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion DELETE
router.delete('/:_id', async(req, res) => {
    try {
        const miembro = await Miembros.findByIdAndDelete(req.params._id);
        res.status(200).send('Miembro borrado');

    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

module.exports = router;