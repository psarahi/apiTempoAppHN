const express = require('express');
const Actividades = require('../modelos/actividadesModel');
// const Cuentas = require('../modelos/cuentasModel');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Funcion get todos
router.get('/', async(req, res) => {
    const actividades = await Actividades.find()
        .populate('cuentas', 'empresa lugar');
    res.send(actividades);
});

// Funcion get documentos activos
router.get('/activo', async(req, res) => {
    const actividades = await Actividades.find({ estado: true });
    res.send(actividades);
});

// Funcion get segun la cuenta TODOS
router.get('/cuenta/:cuentas', async(req, res) => {
    const actividad = await Actividades.find({ cuentas: { $eq: req.params.cuentas } });
    if (!actividad) return res.status(404).send('No se encontro ningun documento');
    res.send(actividad);
});

// Funcion get segun la cuenta ACTIVOS
router.get('/activoCuenta/:cuentas', async(req, res) => {
    const actividad = await Actividades.find({ $and: [{ cuentas: { $eq: req.params.cuentas } }, { estado: true }] });
    if (actividad === undefined) {
        return res.status(404).send('No se encontro ningun documento');
    } else {
        res.send(actividad);
    }
});

// Funcion get por _id unico
router.get('/:_id', async(req, res) => {
    const actividad = await Actividades.findById(req.params._id);
    if (!actividad) return res.status(404).send('No se encontro ningun documento');
    res.send(actividad);
});

// Funcion POST
router.post('/', async(req, res) => {
    const actividad = new Actividades({
        nombre: req.body.nombre,
        cuentas: req.body.cuentas,
        estado: req.body.estado
    });
    const result = await actividad.save();
    res.status(201).send(result);
});

// Funcion PUT
router.put('/:_id', async(req, res) => {

    const actividad = await Actividades.findByIdAndUpdate(req.params._id, {
        nombre: req.body.nombre,
        cuentas: req.body.cuentas,
        estado: req.body.estado
    }, {
        new: true
    });

    if (!actividad) {
        return res.status(404).send('No se encontro ningun documento');
    }

    res.status(204).send();
});

// Funcion DELETE
router.delete('/:_id', async(req, res) => {
    const actividad = await Actividades.findByIdAndDelete(req.params._id);
    if (!actividad) {
        return res.status(404).send('No se encontro ningun documento para borrar');
    } else {
        res.status(200).send('Actividad borrada');
    }
});

// Rutas Joins
// router.get('/join', async(req, res) => {
//     const actividades = await Actividades.find()
//         .populate('cuentas', 'nombre apellido correo');
//     res.send(actividades);
// });

module.exports = router;