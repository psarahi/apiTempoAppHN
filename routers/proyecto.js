const express = require('express');
const Proyecto = require('../modelos/proyectoModel');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Funcion get todos
router.get('/', async(req, res) => {
    const proyectos = await Proyecto.find()
        .populate('miembros', 'empresa nombre apellido expertis');
    res.send(proyectos);
});

// Funcion get documentos activos
router.get('/activo', async(req, res) => {
    const proyectos = await Proyecto.find({ estado: true })
        .populate('miembros', 'empresa nombre apellido expertis');
    res.send(proyectos);
});

// Funcion get segun la cuenta TODOS
router.get('/cuenta/:cuentas', async(req, res) => {
    const proyectos = await Proyecto.find({ cuentas: { $eq: req.params.cuentas } })
        .populate('miembros', 'empresa nombre apellido expertis');

    if (!proyectos) return res.status(404).send('No se encontro ningun documento');
    res.send(proyectos);
});

// Funcion get segun la cuenta ACTIVOS
router.get('/activoCuenta/:cuentas', async(req, res) => {
    const proyectos = await Proyecto.find({ $and: [{ cuentas: { $eq: req.params.cuentas } }, { estado: true }] })
        .populate('miembros', 'empresa nombre apellido expertis');

    if (!proyectos) return res.status(404).send('No se encontro ningun documento');
    res.send(proyectos);
});

// Funcion get por _id unico
router.get('/:_id', async(req, res) => {
    const proyecto = await Proyecto.findById(req.params._id)
        .populate('miembros', 'empresa nombre apellido expertis');

    if (!proyecto) return res.status(404).send('No se encontro ningun documento');
    res.send(proyecto);
});

// Funcion POST
router.post('/', async(req, res) => {

    const proyecto = new Proyecto({
        cuentas: req.body.cuentas,
        nombreProyecto: req.body.nombreProyecto,
        miembros: req.body.miembros,
        tiempoProyectadoPro: req.body.tiempoProyectadoPro,
        tiempoRealPro: req.body.tiempoRealPro,
        presuProyectadoPro: req.body.presuProyectadoPro,
        presupuestoRealPro: req.body.presupuestoRealPro,
        estado: req.body.estado
    });
    const result = await proyecto.save();
    res.status(201).send(result);
});

// Funcion PUT
router.put('/:_id', async(req, res) => {

    const proyecto = await Proyecto.findByIdAndUpdate(req.params._id, {
        cuentas: req.body.cuentas,
        nombreProyecto: req.body.nombreProyecto,
        miembros: req.body.miembros,
        tiempoProyectadoPro: req.body.tiempoProyectadoPro,
        tiempoRealPro: req.body.tiempoRealPro,
        presuProyectadoPro: req.body.presuProyectadoPro,
        presupuestoRealPro: req.body.presupuestoRealPro,
        estado: req.body.estad
    }, {
        new: true
    });

    if (!proyecto) {
        return res.status(404).send('No se encontro ningun documento');
    }

    res.status(204).send();
});

// Funcion DELETE
router.delete('/:_id', async(req, res) => {
    const proyecto = await Proyecto.findByIdAndDelete(req.params._id);
    if (!proyecto) {
        return res.status(404).send('No se encontro ningun documento para borrar');
    } else {
        res.status(200).send('Proyecto borrado');
    }
});

//////////////////////// Rutas Joins //////////////////////////
// router.get('/proyectoMiembro', async(req, res) => {
//     const proyectos = await Proyecto.find()
//         .populate('cuentas');
//     res.send(proyectos);
// });

module.exports = router;