const auth = require('../middleware/auth_token');
const autorizar = require('../middleware/roles');
const express = require('express');
const Actividades = require('../modelos/actividadesModel');
// const Cuentas = require('../modelos/cuentasModel');
const router = express.Router();
const { check, validationResult } = require('express-validator');


// Funcion get todos
// router.get('/', auth, async(req, res) => {  5e8e222fce7ae6c0d4926b88
router.get('/', [auth, autorizar(['5e8e2246ce7ae6c0d4926b89', '5e8e222fce7ae6c0d4926b88', '5e8e22d0ce7ae6c0d4926b8a'])], async(req, res) => {
    // router.get('/', async(req, res) => {


    try {
        const actividades = await Actividades.find();
        res.send(actividades);

    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');
    }
});

// Funcion get documentos activos
router.get('/activo', async(req, res) => {
    try {
        const actividades = await Actividades.find({ estado: true });
        res.send(actividades);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');
    }

});

// Funcion get segun la cuenta TODOS
router.get('/cuenta/:cuentas', async(req, res) => {
    try {
        const actividad = await Actividades.find({ cuentas: { $eq: req.params.cuentas } });
        res.send(actividad);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');
    }

});

// Funcion get segun la cuenta ACTIVOS
router.get('/activoCuenta/:cuentas', async(req, res) => {
    try {
        const actividad = await Actividades.find({
            $and: [
                { cuentas: { $eq: req.params.cuentas } },
                { estado: true }
            ]
        });
        res.send(actividad);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');
    }

});

// Funcion get por _id unico
router.get('/:_id', async(req, res) => {
    try {
        const actividad = await Actividades.findById(req.params._id);
        res.send(actividad);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');
    }
});

// Funcion POST
router.post('/', async(req, res) => {
    try {
        const actividad = new Actividades({
            nombre: req.body.nombre,
            cuentas: req.body.cuentas,
            estado: req.body.estado
        });
        const result = await actividad.save();
        res.status(201).send(result);

    } catch (error) {
        console.log(error);
        res.status(404).send('No se pudo registrar el documento');
    }

});

// Funcion PUT
router.put('/:_id', async(req, res) => {
    try {
        const actividad = await Actividades.findByIdAndUpdate(req.params._id, {
            nombre: req.body.nombre,
            cuentas: req.body.cuentas,
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
        const actividad = await Actividades.findByIdAndDelete(req.params._id);
        res.status(200).send('Actividad borrada');
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');
    }

});

// Rutas Joins
// router.get('/join', async(req, res) => {
//     const actividades = await Actividades.find()
//         .populate('cuentas', 'nombre apellido correo');
//     res.send(actividades);
// });

module.exports = router;