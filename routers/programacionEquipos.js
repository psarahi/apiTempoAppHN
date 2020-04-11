const express = require('express');
const ProgramacionEquipos = require('../modelos/programacionEquiposModel');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Funcion get todos
router.get('/', async(req, res) => {
    const programacionEquipos = await ProgramacionEquipos.find()
        .populate('miembros', 'nombre apellido costoHr');
    res.send(programacionEquipos);
});

// Funcion get documentos activos
router.get('/activo', async(req, res) => {
    const programacionEquipos = await ProgramacionEquipos.find({ estado: true })
        .populate('miembros', 'nombre apellido costoHr');
    res.send(programacionEquipos);
});

// Funcion get segun la Programacion Proyecto TODOS
router.get('/ProgramacionProyecto/:programacionproyectos', async(req, res) => {
    const programacionEquipos = await ProgramacionEquipos.find({ programacionproyectos: { $eq: req.params.programacionproyectos } })
        .populate('miembros', 'nombre apellido costoHr');
    if (!programacionEquipos) return res.status(404).send('No se encontro ningun documento');
    res.send(programacionEquipos);
});

// Funcion get segun la Programacion Proyecto ACTIVOS
router.get('/activoProgramacionProyecto/:programacionproyectos', async(req, res) => {
    const miembros = await Miembros.find({
            $and: [
                { programacionproyectos: { $eq: req.params.programacionproyectos } },
                { estado: true }
            ]
        })
        .populate('miembros', 'nombre apellido costoHr');
    if (!miembro) return res.status(404).send('No se encontro ningun documento');
    res.send(miembros);
});

// Funcion get por _id unico
router.get('/:_id', async(req, res) => {
    const programacionEquipo = await ProgramacionEquipos.findById(req.params._id)
        .populate('miembros', 'nombre apellido costoHr');
    if (!programacionEquipo) return res.status(404).send('No se encontro ningun documento');
    res.send(programacionEquipo);
});

// Funcion POST
router.post('/', async(req, res) => {

    const programacionEquipo = new ProgramacionEquipos({
        programacionproyectos: req.body.programacionproyectos,
        miembros: req.body.miembros,
        estado: req.body.estado
    });
    const result = await programacionEquipo.save();
    res.status(201).send(result);
});

// Funcion PUT
router.put('/:_id', async(req, res) => {

    const programacionEquipo = await ProgramacionEquipos.findByIdAndUpdate(req.params._id, {
        programacionproyectos: req.body.programacionproyectos,
        miembros: req.body.miembros,
        estado: req.body.estado
    }, {
        new: true
    });

    if (!programacionEquipo) {
        return res.status(404).send('No se encontro ningun documento');
    }

    res.status(204).send();
});

// Funcion DELETE
router.delete('/:_id', async(req, res) => {
    const programacionEquipo = await ProgramacionEquipos.findByIdAndDelete(req.params._id);
    if (!programacionEquipo) {
        return res.status(404).send('No se encontro ningun documento para borrar');
    } else {
        res.status(200).send('Programacion de Equipos borrada');
    }
});

module.exports = router;