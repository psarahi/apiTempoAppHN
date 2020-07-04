const express = require('express');
const ProgramacionProyecto = require('../modelos/programacionProyectoModel');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Funcion get todos
router.get('/', async(req, res) => {
    try {
        const programacionProyectos = await ProgramacionProyecto.find()
            .populate('actividades', 'nombre');
        res.send(programacionProyectos);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get documentos activos
router.get('/activo', async(req, res) => {
    try {
        const programacionProyectos = await ProgramacionProyecto.find({ estado: true })
            .populate('actividades', 'nombre');
        res.send(programacionProyectos);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get segun la cuenta y proyecto TODOS
router.get('/cuenta/:cuentas/:proyectos', async(req, res) => {
    try {
        const programacionProyectos = await ProgramacionProyecto.find({
                $and: [
                    { cuentas: { $eq: req.params.cuentas } },
                    { proyectos: { $eq: req.params.proyectos } }
                ]
            })
            .populate('actividades', 'nombre');
        res.send(programacionProyectos);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get segun la cuenta TODOS nombres de proyectos y actividades
router.get('/detalles/:cuentas', async(req, res) => {
    try {
        const programacionProyectos = await ProgramacionProyecto.find({ cuentas: { $eq: req.params.cuentas } }, 'proyectos actividades cuentas')
            .populate('actividades proyectos cuentas', 'nombre nombreProyecto empresa');
        res.send(programacionProyectos);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get segun la cuenta y proyecto ACTIVOS
router.get('/activoCuenta/:cuentas/:proyectos', async(req, res) => {
    try {
        const programacionProyectos = await ProgramacionProyecto.find({
                $and: [
                    { cuentas: { $eq: req.params.cuentas } },
                    { proyectos: { $eq: req.params.proyectos } },
                    { estado: true }
                ]
            })
            .populate('actividades', 'nombre');
        res.send(programacionProyectos);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get por _id unico
router.get('/:_id', async(req, res) => {
    try {
        const programacionProyecto = await ProgramacionProyecto.findById(req.params._id)
            .populate('actividades', 'nombre');
        res.send(programacionProyecto);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion POST
router.post('/', async(req, res) => {
    try {
        const programacionProyecto = new ProgramacionProyecto({
            cuentas: req.body.cuentas,
            proyectos: req.body.proyectos,
            actividades: req.body.actividades,
            tiempoProyectado: req.body.tiempoProyectado,
            tiempoReal: req.body.tiempoReal,
            estado: req.body.estado
        });
        const saveRegistro = await programacionProyecto.save();
        const resultSave = await ProgramacionProyecto.findById(saveRegistro.id)
            .populate('actividades', 'nombre');

        res.status(201).send(resultSave);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se pudo registrar el documento');

    }

});

// Funcion PUT
router.put('/:_id', async(req, res) => {
    try {
        const programacionProyecto = await ProgramacionProyecto.findByIdAndUpdate(req.params._id, {
            cuentas: req.body.cuentas,
            proyectos: req.body.proyectos,
            actividades: req.body.actividades,
            tiempoProyectado: req.body.tiempoProyectado,
            tiempoReal: req.body.tiempoReal,
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
        const programacionProyecto = await ProgramacionProyecto.findByIdAndDelete(req.params._id);
        res.status(200).send('Programacion de Proyecto borrada');
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

module.exports = router;