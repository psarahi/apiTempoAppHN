const express = require('express');
const ProgramacionEquipos = require('../modelos/programacionEquiposModel');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Funcion get todos
router.get('/', async(req, res) => {
    try {
        const programacionEquipos = await ProgramacionEquipos.find()
            .populate('miembros', 'nombre apellido costoHr');
        res.send(programacionEquipos);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get documentos activos
router.get('/activo', async(req, res) => {
    try {
        const programacionEquipos = await ProgramacionEquipos.find({ estado: true })
            .populate('miembros', 'nombre apellido costoHr');
        res.send(programacionEquipos);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get segun la Programacion Proyecto TODOS
router.get('/ProgramacionProyecto/:programacionproyectos', async(req, res) => {
    try {
        const programacionEquipos = await ProgramacionEquipos.find({ programacionproyectos: { $eq: req.params.programacionproyectos } })
            .populate('miembros', 'nombre apellido costoHr');
        res.send(programacionEquipos);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get segun la Programacion Proyecto ACTIVOS
router.get('/activoProgramacionProyecto/:programacionproyectos', async(req, res) => {
    try {
        const miembros = await Miembros.find({
                $and: [
                    { programacionproyectos: { $eq: req.params.programacionproyectos } },
                    { estado: true }
                ]
            })
            .populate('miembros', 'nombre apellido costoHr');
        res.send(miembros);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get por _id unico
router.get('/:_id', async(req, res) => {
    try {
        const programacionEquipo = await ProgramacionEquipos.findById(req.params._id)
            .populate('miembros', 'nombre apellido costoHr');
        res.send(programacionEquipo);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion POST
router.post('/', async(req, res) => {
    try {
        const programacionEquipo = new ProgramacionEquipos({
            programacionproyectos: req.body.programacionproyectos,
            miembros: req.body.miembros,
            estado: req.body.estado
        });
        const result = await programacionEquipo.save();
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion PUT
router.put('/:_id', async(req, res) => {
    try {
        const programacionEquipo = await ProgramacionEquipos.findByIdAndUpdate(req.params._id, {
            programacionproyectos: req.body.programacionproyectos,
            miembros: req.body.miembros,
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
        const programacionEquipo = await ProgramacionEquipos.findByIdAndDelete(req.params._id);
        res.status(200).send('Programacion de Equipos borrada');

    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

module.exports = router;