const express = require('express');
const Proyecto = require('../modelos/proyectoModel');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Funcion get todos
router.get('/', async(req, res) => {
    try {
        const proyectos = await Proyecto.find()
            .populate('miembros', 'empresa nombre apellido expertis');
        res.send(proyectos);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get documentos activos
router.get('/activo', async(req, res) => {
    try {
        const proyectos = await Proyecto.find({ estado: true })
            .populate('miembros', 'empresa nombre apellido expertis');
        res.send(proyectos);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get segun la cuenta TODOS
router.get('/cuenta/:cuentas', async(req, res) => {
    try {
        const proyectos = await Proyecto.find({ cuentas: { $eq: req.params.cuentas } })
            .populate('miembros', 'empresa nombre apellido expertis');
        res.send(proyectos);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get segun la cuenta ACTIVOS
router.get('/activoCuenta/:cuentas', async(req, res) => {
    try {
        const proyectos = await Proyecto.find({
                $and: [
                    { cuentas: { $eq: req.params.cuentas } },
                    { estado: true }
                ]
            })
            .populate('miembros', 'empresa nombre apellido expertis');

        res.send(proyectos);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get por _id unico
router.get('/:_id', async(req, res) => {
    try {
        const proyecto = await Proyecto.findById(req.params._id)
            .populate('miembros', 'empresa nombre apellido expertis');

        res.send(proyecto);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }

});

// Funcion POST
router.post('/', async(req, res) => {
    try {
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
        const saveRegistro = await proyecto.save();
        const resultSave = await Proyecto.findById(saveRegistro.id)
            .populate('miembros', 'empresa nombre apellido expertis');

        res.status(201).send(resultSave);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se pudo registrar el documento');

    }
});

// Funcion PUT
router.put('/:_id', async(req, res) => {
    try {
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
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion DELETE
router.delete('/:_id', async(req, res) => {
    try {
        const proyecto = await Proyecto.findByIdAndDelete(req.params._id);
        res.status(200).send('Proyecto borrado');
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

//////////////////////// Rutas Joins //////////////////////////
// router.get('/proyectoMiembro', async(req, res) => {
//     const proyectos = await Proyecto.find()
//         .populate('cuentas');
//     res.send(proyectos);
// });

module.exports = router;