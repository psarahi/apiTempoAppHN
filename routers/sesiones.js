const express = require('express');
const Sesiones = require('../modelos/sesionesModel');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const io = require("../sockets/socket");

moment.locale('es');

// Funcion get todos
router.get('/', async(req, res) => {
    try {
        const sesiones = await Sesiones.find()
            .populate('miembros', 'nombre apellido usuario')
            .sort({ fechaLogin: -1 });
        res.send(sesiones);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');
    }
});

// Funcion get Cuentas
router.get('/sesionesCuenta/:cuenta', async(req, res) => {
    try {
        const sesiones = await Sesiones.find({ cuentas: { $eq: req.params.cuenta } })
            .populate('miembros', 'nombre apellido usuario')
            .sort({ fechaLogin: -1 });

        res.send(sesiones);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});


// Funcion get Cuentas Dia
router.get('/sesionesCuentaDia/:cuenta', async(req, res) => {
    try {
        const sesiones = await Sesiones.find({
                $and: [{
                        cuentas: {
                            $eq: req.params.cuenta
                        }
                    }, {
                        fechaLogin: { $lt: moment().add(1, 'day').add(6, 'hour').format("YYYY-MM-DD") }
                    }, {
                        fechaLogin: { $gt: moment().subtract(1, 'day').format("YYYY-MM-DD") }
                    },
                    { estado: true }
                ]
            }, 'miembros')
            // .populate('miembros', 'nombre apellido usuario')
            .sort({ fechaLogin: -1 });

        //  io.emit('usuarios-conectados', sesiones);

        res.send(sesiones);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion get sesion Dia por miembro
router.get('/sesionMiembroDia/:miembro', async(req, res) => {
    try {
        const sesion = await Sesiones.find({
            $and: [{
                miembros: {
                    $eq: req.params.miembro
                }
            }, {
                fechaLogin: { $lt: moment().add(1, 'day').add(6, 'hour').format("YYYY-MM-DD") }
            }, {
                fechaLogin: { $gt: moment().subtract(1, 'day').format("YYYY-MM-DD") }
            }]
        });
        // .populate('miembros', 'nombre apellido usuario')

        //  io.emit('usuarios-conectados', sesiones);

        res.send(sesion);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

// Funcion POST
router.post('/', async(req, res) => {
    try {
        const sesion = new Sesiones({
            cuentas: req.body.cuentas,
            miembros: req.body.miembros,
            fechaLogin: req.body.fechaLogin,
            fechaLoginTemp: req.body.fechaLoginTemp,
            fechaLogout: req.body.fechaLogout,
            tiempoLogin: req.body.tiempoLogin,
            estado: req.body.estado
        });

        const saveRegistro = await sesion.save();
        const resultSave = await Sesiones.findById(saveRegistro.id);
        // .populate('miembros', 'nombre apellido usuario');

        const sesiones = await Sesiones.find({
                $and: [{
                        cuentas: {
                            $eq: req.body.cuentas
                        }
                    }, {
                        fechaLogin: { $lt: moment().add(1, 'day').add(6, 'hour').format("YYYY-MM-DD") }
                    }, {
                        fechaLogin: { $gt: moment().subtract(1, 'day').format("YYYY-MM-DD") }
                    },
                    { estado: true }
                ]
            })
            // .populate('miembros', 'nombre apellido usuario')
            // .sort({ fechaLogin: -1 });

        io.emit('usuarios-conectados', sesiones);

        res.status(201).send(resultSave);

    } catch (error) {
        console.log(error);
        res.status(404).send('No se pudo registrar el documento');
    }
});

router.put('/:_id', async(req, res) => {
    try {

        const sesion = await Sesiones.findByIdAndUpdate(req.params._id, {
            cuentas: req.body.cuentas,
            miembros: req.body.miembros,
            fechaLogin: req.body.fechaLogin,
            fechaLoginTemp: req.body.fechaLoginTemp,
            fechaLogout: req.body.fechaLogout,
            tiempoLogin: req.body.tiempoLogin,
            estado: req.body.estado
        }, {
            new: true
        });

        const sesiones = await Sesiones.find({
            $and: [{
                    cuentas: {
                        $eq: req.body.cuentas
                    }
                },
                {
                    fechaLogin: { $lt: moment().add(1, 'day').add(6, 'hour').format("YYYY-MM-DD") }
                }, {
                    fechaLogin: { $gt: moment().subtract(1, 'day').format("YYYY-MM-DD") }
                },
                { estado: true }
            ]
        });
        // .populate('miembros', 'nombre apellido usuario')
        //.sort({ fechaLogin: -1 });

        io.emit('usuarios-conectados', sesiones);

        res.status(201).send(sesion);
    } catch (error) {
        console.log(error);
        res.status(404).send('No se encontro ningun documento');

    }
});

module.exports = router;