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
const { json } = require("../sockets/socket");
moment.locale("es");

//ESTADOS
// 5f00e4c38c10d277700bcfa0    En curso
// 5f00e4e58c10d277700bcfa2    Pausada
// 5f00e4f88c10d277700bcfa3    Finalizada
// 5f03ce10fbd6f3df7d7251b2    Tiempo muerto

// Funcion get todos TODOS LAS FINALIZADAS PARA SADMIN
router.get("/", async(req, res) => {
    try {
        const detalleActividades = await DetalleActividad.find({
                estado: "5f00e4f88c10d277700bcfa3"
            })
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
                    }
                ]
            })
            .populate("estado")
            .sort({
                inicio: -1
            });

        res.send(detalleActividades);
    } catch (error) {
        console.log(error);
        res.status(404).send("No se encontro ningun documento");
    }
});

// Funcion get documentos activos  TODOS ACTIVOS PARA SADMIN
router.get("/activo", async(req, res) => {
    try {
        const detalleActividades = await DetalleActividad.find({
                estado: { $in: ['5f00e4e58c10d277700bcfa2', '5f00e4c38c10d277700bcfa0'] }
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
                    }
                ]
            })
            .populate("estado")
            .sort({
                inicio: -1
            });

        res.send(detalleActividades);
    } catch (error) {
        console.log(error);
        res.status(404).send("No se encontro ningun documento");
    }
});

// Funcion get segun la cuenta TODOS ACTIVIDADES FINALIZADAS POR CUENTA
router.get("/cuenta/:cuentas", async(req, res) => {
    try {
        const detalleActividad = await DetalleActividad.find({
                $and: [{
                    cuentas: {
                        $eq: req.params.cuentas
                    }
                }, {
                    estado: "5f00e4f88c10d277700bcfa3"
                }]
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
                    }
                ]
            })
            .populate("estado")
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
                    estado: { $in: ['5f00e4e58c10d277700bcfa2', '5f00e4c38c10d277700bcfa0'] }
                }]
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
                    }
                ]
            })
            .populate("estado")
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
                $and: [{
                    cuentas: {
                        $eq: req.params.cuentas
                    }
                }, {
                    estado: { $in: ['5f00e4e58c10d277700bcfa2', '5f00e4f88c10d277700bcfa3'] }
                }]
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
                    }
                ]
            })
            .populate("estado")
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
                    estado: { $in: ['5f00e4c38c10d277700bcfa0', '5f03ce10fbd6f3df7d7251b2', '5f00e4e58c10d277700bcfa2'] }
                }]
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
                    }
                ]
            })
            .populate("estado")
            .sort({
                inicio: -1
            });

        res.send([
            detalleActividad.filter(
                x => x.programacionequipos.miembros._id == req.params.miembro && (x.estado._id == "5f00e4c38c10d277700bcfa0" || x.estado._id == "5f00e4e58c10d277700bcfa2")
            ),
            detalleActividad.filter(
                x => (x.programacionequipos.miembros._id == req.params.miembro && x.estado._id == "5f03ce10fbd6f3df7d7251b2") && (moment(x.fin).format('YYYY-MM-DD HH:mm:ss') == moment(x.inicio).format('YYYY-MM-DD HH:mm:ss')))
        ]);
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
                    }
                ]
            })
            .populate("estado");

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
            estado: req.body.estado,
        });

        const saveRegistro = await detalleActividad.save();

        const Actividades = await DetalleActividad.find({
                $and: [{
                    cuentas: {
                        $eq: req.body.cuentas
                    }
                }, {
                    estado: { $in: ['5f00e4c38c10d277700bcfa0', '5f00e4e58c10d277700bcfa2'] }
                }]
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
                    }
                ]
            })
            .populate("estado")
            .sort({
                inicio: -1
            });

        const resultSave = await DetalleActividad.findById(saveRegistro.id)
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
            .populate("estado");

        io.emit("actividades-enCurso", [Actividades, req.body.cuentas]);

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
                estado: req.body.estado,
            }, {
                new: true,
            }
        );

        const resultUpdate = await DetalleActividad.findById(detalleActividad._id)
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
                    }
                ]
            })
            .populate("estado");

        if (req.body.estado == '5f00e4f88c10d277700bcfa3') {
            io.emit("actividades-calendario", resultUpdate);
        }

        const Actividades = await DetalleActividad.find({
                $and: [{
                    cuentas: {
                        $eq: req.body.cuentas
                    }
                }, {
                    estado: { $in: ['5f00e4e58c10d277700bcfa2', '5f00e4c38c10d277700bcfa0'] }
                }]
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
                    }
                ]
            })
            .populate("estado")
            .sort({
                inicio: -1
            });

        io.emit("actividades-actualizada", [Actividades, resultUpdate, req.body.cuentas, req.body.estado]);

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