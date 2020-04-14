const express = require('express');
const Cuenta = require('../modelos/cuentasModel');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Funcion get todos
router.get('/', async(req, res) => {
    try {
        const cuentas = await Cuenta.find()
            .populate('perfiles', 'nombre')
            .sort({ fechaRegistro: -1 });
        res.send(cuentas);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get documentos activos
router.get('/activo', async(req, res) => {
    try {
        const cuentas = await Cuenta.find({ estado: true })
            .sort({ fechaRegistro: -1 });
        res.send(cuentas);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get por _id unico
router.get('/:_id', async(req, res) => {
    try {
        const cuenta = await Cuenta.findById(req.params._id);
        res.send(cuenta);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion POST
router.post('/', async(req, res) => {
    try {
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
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion PUT
router.put('/:_id', async(req, res) => {
    try {
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
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion DELETE
router.delete('/:_id', async(req, res) => {
    try {
        const cuenta = await Cuenta.findByIdAndDelete(req.params._id);
        res.status(200).send('Cuenta borrada');

    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }

});


//////////////////////////// Rutas transacciones //////////////////////////


module.exports = router;