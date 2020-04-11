const express = require('express');
const ProgramacionProyecto = require('../modelos/programacionProyectoModel');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Funcion get todos
router.get('/', async(req, res) => {
    const programacionProyectos = await ProgramacionProyecto.find()
        .populate('actividades', 'nombre');
    res.send(programacionProyectos);
});

// Funcion get documentos activos
router.get('/activo', async(req, res) => {
    const programacionProyectos = await ProgramacionProyecto.find({ estado: true })
        .populate('actividades', 'nombre');
    res.send(programacionProyectos);
});

// Funcion get segun la cuenta y proyecto TODOS
router.get('/cuenta/:cuentas/:proyectos', async(req, res) => {
    const programacionProyectos = await ProgramacionProyecto.find({ $and: [{ cuentas: { $eq: req.params.cuentas } }, { proyectos: { $eq: req.params.proyectos } }] })
        .populate('actividades', 'nombre');
    if (!programacionProyectos) return res.status(404).send('No se encontro ningun documento');
    res.send(programacionProyectos);
});

// Funcion get segun la cuenta y proyecto ACTIVOS
router.get('/activoCuenta/:cuentas/:proyectos', async(req, res) => {
    const programacionProyectos = await ProgramacionProyecto.find({
            $and: [
                { cuentas: { $eq: req.params.cuentas } },
                { proyectos: { $eq: req.params.proyectos } },
                { estado: true }
            ]
        })
        .populate('actividades', 'nombre');
    if (!programacionProyectos) return res.status(404).send('No se encontro ningun documento');
    res.send(programacionProyectos);
});

// Funcion get por _id unico
router.get('/:_id', async(req, res) => {
    const programacionProyecto = await ProgramacionProyecto.findById(req.params._id)
        .populate('actividades', 'nombre');
    if (!programacionProyecto) return res.status(404).send('No se encontro ningun documento');
    res.send(programacionProyecto);
});

// Funcion POST
router.post('/', async(req, res) => {

    const programacionProyecto = new ProgramacionProyecto({
        cuentas: req.body.cuentas,
        proyectos: req.body.proyectos,
        actividades: req.body.actividades,
        tiempoProyectado: req.body.tiempoProyectado,
        tiempoReal: req.body.tiempoReal,
        presupuestoProyectado: req.body.presupuestoProyectado,
        presupuestoReal: req.body.presupuestoReal,
        estado: req.body.estado
    });
    const result = await programacionProyecto.save();
    res.status(201).send(result);
});

// Funcion PUT
router.put('/:_id', async(req, res) => {

    const programacionProyecto = await ProgramacionProyecto.findByIdAndUpdate(req.params._id, {
        cuentas: req.body.cuentas,
        proyectos: req.body.proyectos,
        actividades: req.body.actividades,
        tiempoProyectado: req.body.tiempoProyectado,
        tiempoReal: req.body.tiempoReal,
        presupuestoProyectado: req.body.presupuestoProyectado,
        presupuestoReal: req.body.presupuestoReal,
        estado: req.body.estado
    }, {
        new: true
    });

    if (!programacionProyecto) {
        return res.status(404).send('No se encontro ningun documento');
    }

    res.status(204).send();
});

// Funcion DELETE
router.delete('/:_id', async(req, res) => {
    const programacionProyecto = await ProgramacionProyecto.findByIdAndDelete(req.params._id);
    if (!programacionProyecto) {
        return res.status(404).send('No se encontro ningun documento para borrar');
    } else {
        res.status(200).send('Programacion de Proyecto borrada');
    }
});

module.exports = router;