const express = require("express");
const DetalleActividad = require("../modelos/detalleActividadModel");
// const Cuentas = require('../modelos/cuentasModel');
const router = express.Router();
// const { actividadesActivas } = require('../sockets/socket');
const io = require("../sockets/socket");
const {
    check,
    validationResult
} = require("express-validator");
const moment = require("moment");
const {
    json
} = require("../sockets/socket");
moment.locale("es");

// Funcion get todos
router.get("/", async(req, res) => {
    try {
        const detalleActividades = await DetalleActividad.find({
                estado: false
            })
            .populate("programacionequipos")
            .populate({
                path: "programacionequipos",
                populate: [{
                        path: "programacionproyecto",
                        select: "proyectos actividades",
                        populate: [{
                                path: "proyectos",
                                select: "nombreProyecto",
                            },
                            {
                                path: "actividades",
                                select: "nombre",
                            },
                        ],
                    },
                    {
                        path: "miembros",
                        select: "nombre apellido"
                    },
                ],
            })
            .sort({
                inicio: -1
            });

        res.send(detalleActividades);
    } catch (error) {
        console.log(error);
        res.status(404).send("No se encontro ningun documento");
    }
});

// Funcion get documentos activos
router.get("/activo", async(req, res) => {
    try {
        const detalleActividades = await DetalleActividad.find({
                estado: true
            })
            .populate("programacionequipos")
            .populate({
                path: "programacionequipos",
                populate: [{
                        path: "programacionproyecto",
                        select: "proyectos actividades",
                        populate: [{
                                path: "proyectos",
                                select: "nombreProyecto",
                            },
                            {
                                path: "actividades",
                                select: "nombre",
                            },
                        ],
                    },
                    {
                        path: "miembros",
                        select: "nombre apellido"
                    },
                ],
            })
            .sort({
                inicio: -1
            });

        res.send(detalleActividades);
    } catch (error) {
        console.log(error);
        res.status(404).send("No se encontro ningun documento");
    }
});

// Funcion get segun la cuenta TODOS
router.get("/cuenta/:cuentas", async(req, res) => {
    try {
        const detalleActividad = await DetalleActividad.find({
                $and: [{
                    cuentas: {
                        $eq: req.params.cuentas
                    }
                }, {
                    estado: false
                }],
            })
            .populate("programacionequipos")
            .populate({
                path: "programacionequipos",
                populate: [{
                        path: "programacionproyecto",
                        select: "proyectos actividades",
                        populate: [{
                                path: "proyectos",
                                select: "nombreProyecto",
                            },
                            {
                                path: "actividades",
                                select: "nombre",
                            },
                        ],
                    },
                    {
                        path: "miembros",
                        select: "nombre apellido"
                    },
                ],
            })
            .sort({
                inicio: -1
            });

        res.send(detalleActividad);
    } catch (error) {
        console.log(error);
        res.status(404).send("No se encontro ningun documento");
    }
});

// Funcion get segun la cuenta ACTIVOS
router.get("/activoCuenta/:cuentas", async(req, res) => {
    try {
        const detalleActividad = await DetalleActividad.find({
                $and: [{
                    cuentas: {
                        $eq: req.params.cuentas
                    }
                }, {
                    estado: true
                }],
            })
            .populate("programacionequipos")
            .populate({
                path: "programacionequipos",
                populate: [{
                        path: "programacionproyecto",
                        select: "proyectos actividades",
                        populate: [{
                                path: "proyectos",
                                select: "nombreProyecto",
                            },
                            {
                                path: "actividades",
                                select: "nombre",
                            },
                        ],
                    },
                    {
                        path: "miembros",
                        select: "nombre apellido"
                    },
                ],
            })
            .sort({
                inicio: -1
            });

        res.send(detalleActividad);
    } catch (error) {
        console.log(error);
        res.status(404).send("No se encontro ningun documento");
    }
});

// Funcion get segun la cuenta y miembros TODOS
router.get("/miembrosDetalle/:cuentas/:miembro", async(req, res) => {
    try {
        const detalleActividad = await DetalleActividad.find({
                cuentas: {
                    $eq: req.params.cuentas
                },
            })
            .populate({
                path: "programacionequipos",
                match: {
                    miembros: {
                        $eq: req.params.miembro
                    }
                },
                populate: [{
                        path: "programacionproyecto",
                        select: "proyectos actividades",
                        populate: [{
                                path: "proyectos",
                                select: "nombreProyecto",
                            },
                            {
                                path: "actividades",
                                select: "nombre",
                            },
                        ],
                    },
                    {
                        path: "miembros",
                        select: "nombre apellido"
                    },
                ],
            })
            .sort({
                inicio: -1
            });

        res.send(detalleActividad.filter(
            (x) => x.programacionequipos.miembros._id == (req.params.miembro)
        ));
    } catch (error) {
        console.log(error);
        res.status(404).send("No se encontro ningun documento");
    }
});

// Funcion get segun la cuenta y miembros ACTIVOS
router.get("/miembrosDetalleActivos/:cuentas/:miembro", async(req, res) => {
    try {
        const detalleActividad = await DetalleActividad.find({
                $and: [{
                    cuentas: {
                        $eq: req.params.cuentas
                    }
                }, {
                    estado: true
                }],
            }).populate({
                path: "programacionequipos",
                // match: { miembros: { $eq: req.params.miembro } }
                populate: [{
                        path: "programacionproyecto",
                        select: "proyectos actividades",
                        populate: [{
                                path: "proyectos",
                                select: "nombreProyecto",
                            },
                            {
                                path: "actividades",
                                select: "nombre",
                            },
                        ],
                    },
                    {
                        path: "miembros",
                        select: "nombre apellido"
                    },
                ],
            })
            .sort({
                inicio: -1
            });

        res.send(detalleActividad.filter(
            (x) => x.programacionequipos.miembros._id == (req.params.miembro)
        ));
    } catch (error) {
        console.log(error);
        res.status(404).send("No se encontro ningun documento");
    }
});

// Funcion get por _id unico
router.get("/:_id", async(req, res) => {
    try {
        const detalleActividad = await DetalleActividad.findById(req.params._id)
            .populate("programacionequipos")
            .populate({
                path: "programacionequipos",
                populate: [{
                        path: "programacionproyecto",
                        select: "proyectos actividades",
                        populate: [{
                                path: "proyectos",
                                select: "nombreProyecto",
                            },
                            {
                                path: "actividades",
                                select: "nombre",
                            },
                        ],
                    },
                    {
                        path: "miembros",
                        select: "nombre apellido"
                    },
                ],
            });

        res.send(detalleActividad);
    } catch (error) {
        console.log(error);
        res.status(404).send("No se encontro ningun documento");
    }
});

// Funcion POST
router.post("/", async(req, res) => {
    try {
        const detalleActividad = new DetalleActividad({
            cuentas: req.body.cuentas,
            programacionequipos: req.body.programacionequipos,
            descripcion: req.body.descripcion,
            inicio: req.body.inicio,
            fin: req.body.fin,
            costo: req.body.costo,
            estado: req.body.estado,
        });

        const saveRegistro = await detalleActividad.save();
        const resultSave = await DetalleActividad.findById(saveRegistro.id)
            .populate("programacionequipos")
            .populate({
                path: "programacionequipos",
                populate: [{
                        path: "programacionproyecto",
                        select: "proyectos actividades",
                        populate: [{
                                path: "proyectos",
                                select: "nombreProyecto",
                            },
                            {
                                path: "actividades",
                                select: "nombre",
                            },
                        ],
                    },
                    {
                        path: "miembros",
                        select: "nombre apellido"
                    },
                ],
            });

        io.emit("actividades-enCurso", resultSave);

        res.status(201).send(resultSave);
    } catch (error) {
        console.log(error);
        res.status(404).send("No se pudo registrar el documento");
    }
});

// Funcion PUT
router.put("/:_id", async(req, res) => {
    try {
        const detalleActividad = await DetalleActividad.findByIdAndUpdate(
            req.params._id, {
                cuentas: req.body.cuentas,
                programacionequipos: req.body.programacionequipos,
                descripcion: req.body.descripcion,
                inicio: req.body.inicio,
                fin: req.body.fin,
                costo: req.body.costo,
                estado: req.body.estado,
            }, {
                new: true,
            }
        );

        const resultUpdate = await DetalleActividad.findById(detalleActividad._id)
            .populate("programacionequipos")
            .populate({
                path: "programacionequipos",
                populate: [{
                        path: "programacionproyecto",
                        select: "proyectos actividades",
                        populate: [{
                                path: "proyectos",
                                select: "nombreProyecto",
                            },
                            {
                                path: "actividades",
                                select: "nombre",
                            },
                        ],
                    },
                    {
                        path: "miembros",
                        select: "nombre apellido"
                    },
                ],
            });

        io.emit("actividades-terminada", resultUpdate);

        res.status(201).send(resultUpdate);
    } catch (error) {
        console.log(error);
        res.status(404).send("No se encontro ningun documento");
    }
});

// Funcion DELETE
router.delete("/:_id", async(req, res) => {
    try {
        const detalleActividad = await DetalleActividad.findByIdAndDelete(
            req.params._id
        );
        res.status(200).send("Actividad borrada");
    } catch (error) {
        console.log(error);
        res.status(404).send("No se encontro ningun documento");
    }
});

module.exports = router;