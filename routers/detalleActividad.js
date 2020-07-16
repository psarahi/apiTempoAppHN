const express = require("express");
const DetalleActividad = require("../modelos/detalleActividadModel");
const ProgramacionEquipos = require('../modelos/programacionEquiposModel');
const Proyecto = require('../modelos/proyectoModel');
const ProgramacionProyecto = require('../modelos/programacionProyectoModel');

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
// 5f00e4c38c10d277700bcfa0      En curso
// 5f00e4e58c10d277700bcfa2     Pausada
// 5f00e4f88c10d277700bcfa3     Finalizada
// 5f03ce10fbd6f3df7d7251b2     Tiempo muerto
// 5f0a934eb250787e784ab1af     Cierre de aplicación
// 5f0a933db250787e784ab1ae     Sin conexión

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
                        select: "proyectos actividades tiempoProyectado tiempoReal tiempoMuerto",
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
                estado: { $in: ['5f00e4e58c10d277700bcfa2', '5f00e4c38c10d277700bcfa0', '5f0a934eb250787e784ab1af'] }
            })
            .populate("programacionequipos")
            .populate({
                path: "programacionequipos",
                populate: [{
                        path: "programacionproyecto",
                        select: "proyectos actividades tiempoProyectado tiempoReal tiempoMuerto",
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
                    estado: { $in: ['5f03ce10fbd6f3df7d7251b2', '5f00e4f88c10d277700bcfa3'] }
                }]
            })
            .populate("programacionequipos")
            .populate({
                path: "programacionequipos",
                populate: [{
                        path: "programacionproyecto",
                        select: "proyectos actividades tiempoProyectado tiempoReal tiempoMuerto",
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
            detalleActividad.filter(x => x.estado._id == '5f00e4f88c10d277700bcfa3'),
            detalleActividad.filter(x => x.estado._id == '5f03ce10fbd6f3df7d7251b2')
        ]);
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
                    estado: { $in: ['5f00e4e58c10d277700bcfa2', '5f00e4c38c10d277700bcfa0', '5f0a934eb250787e784ab1af'] }
                }]
            })
            .populate("programacionequipos")
            .populate({
                path: "programacionequipos",
                populate: [{
                        path: "programacionproyecto",
                        select: "proyectos actividades tiempoProyectado tiempoReal tiempoMuerto",
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
                    estado: { $in: ['5f03ce10fbd6f3df7d7251b2', '5f00e4f88c10d277700bcfa3'] }
                }]
            })
            .populate({
                path: "programacionequipos",
                populate: [{
                        path: "programacionproyecto",
                        select: "proyectos actividades tiempoProyectado tiempoReal tiempoMuerto",
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
            detalleActividad.filter((x) => x.programacionequipos.miembros._id == (req.params.miembro) && x.estado._id == '5f00e4f88c10d277700bcfa3'),
            detalleActividad.filter((x) => x.programacionequipos.miembros._id == (req.params.miembro) && x.estado._id == '5f03ce10fbd6f3df7d7251b2')
        ]);
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
                    estado: { $in: ['5f00e4c38c10d277700bcfa0', '5f03ce10fbd6f3df7d7251b2', '5f00e4e58c10d277700bcfa2', '5f0a934eb250787e784ab1af'] }
                }]
            }).populate({
                path: "programacionequipos",
                populate: [{
                        path: "programacionproyecto",
                        select: "proyectos actividades tiempoProyectado tiempoReal tiempoMuerto",
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
                x => x.programacionequipos.miembros._id == req.params.miembro && (x.estado._id == "5f00e4c38c10d277700bcfa0" || x.estado._id == "5f00e4e58c10d277700bcfa2" | x.estado._id == '5f0a934eb250787e784ab1af')
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

        const detalleActividad = await DetalleActividad.find({
                $and: [{
                    programacionequipos: {
                        $eq: req.params._id
                    }
                }, {
                    estado: { $in: ['5f00e4c38c10d277700bcfa0', '5f03ce10fbd6f3df7d7251b2', '5f00e4e58c10d277700bcfa2', '5f0a934eb250787e784ab1af'] }
                }]
            }).populate({
                path: "programacionequipos",
                populate: [{
                        path: "programacionproyecto",
                        select: "proyectos actividades tiempoProyectado tiempoReal tiempoMuerto",
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
                x => x.estado._id == "5f00e4c38c10d277700bcfa0" || x.estado._id == "5f00e4e58c10d277700bcfa2" || x.estado._id == '5f0a934eb250787e784ab1af'
            ),
            detalleActividad.filter(
                x => x.estado._id == "5f03ce10fbd6f3df7d7251b2" && (moment(x.fin).format('YYYY-MM-DD HH:mm:ss') == moment(x.inicio).format('YYYY-MM-DD HH:mm:ss')))
        ]);
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
            inicio: new Date(req.body.inicio),
            fecha: new Date(req.body.fecha),
            fin: new Date(req.body.fin),
            estado: req.body.estado,
        });

        const saveRegistro = await detalleActividad.save();

        const Actividades = await DetalleActividad.find({
                $and: [{
                    cuentas: {
                        $eq: req.body.cuentas
                    }
                }, {
                    estado: { $in: ['5f00e4c38c10d277700bcfa0', '5f00e4e58c10d277700bcfa2', '5f0a934eb250787e784ab1af'] }
                }]
            })
            .populate({
                path: "programacionequipos",
                populate: [{
                        path: "programacionproyecto",
                        select: "proyectos actividades tiempoProyectado tiempoReal tiempoMuerto",
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
                        select: "proyectos actividades tiempoProyectado tiempoReal",
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


        const miembro = await resultSave.programacionequipos.miembros._id;

        // Actualizar Programacion de equipos, pasa a desactivado esta finalizada
        await ProgramacionEquipos.findByIdAndUpdate(resultSave.programacionequipos._id, {
            programacionproyecto: resultSave.programacionequipos.programacionproyecto._id,
            miembros: resultSave.programacionequipos.miembros._id,
            estado: false
        }, {
            new: true
        });

        io.emit("actividades-enCurso", [Actividades, req.body.cuentas, miembro]);
        // io.emit("actividades-enCursoMiembro", [Actividades.filter(x => x.programacionequipos.miembros._id == miembro), miembro]);

        res.status(201).send(resultSave);
    } catch (error) {
        console.log(error);
        res.status(404).send("No se pudo registrar el documento");
    }
});


// Funcion get segun la cuenta y miembros ACTIVOS
router.get("/programacionEquipo/:_id", async(req, res) => {
    try {

        const resultUpdate = await DetalleActividad.findById(req.params._id)
            .populate({
                path: "programacionequipos",
                populate: [{
                        path: "programacionproyecto",
                        select: "proyectos actividades tiempoProyectado tiempoReal tiempoMuerto",
                        populate: [{
                                path: "proyectos"
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

        res.send(resultUpdate);
    } catch (error) {
        console.log(error);
        res.status(404).send("No se encontro ningun documento");
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
                inicio: new Date(req.body.inicio),
                fecha: new Date(req.body.fecha),
                fin: new Date(req.body.fin),
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
                        select: "proyectos actividades tiempoProyectado tiempoReal tiempoMuerto",
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

        const miembro = await resultUpdate.programacionequipos.miembros._id;

        if (req.body.estado == '5f00e4f88c10d277700bcfa3') {

            const detalleTiempo = await DetalleActividad.find({
                    $and: [{
                        programacionequipos: {
                            $eq: req.body.programacionequipos
                        }
                    }, {
                        estado: { $in: ['5f03ce10fbd6f3df7d7251b2', '5f00e4f88c10d277700bcfa3'] }
                    }]
                })
                .populate({
                    path: "programacionequipos",
                    populate: [{
                            path: "programacionproyecto",
                            // select: "proyectos actividades tiempoProyectado tiempoReal tiempoMuerto",
                            populate: [{
                                    path: "proyectos"
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

            // io.emit("actividades-calendario", [
            //     detalleTiempo.filter(x => x.estado._id == '5f00e4f88c10d277700bcfa3'),
            //     detalleTiempo.filter(x => x.estado._id == '5f03ce10fbd6f3df7d7251b2')
            // ]);

            const dataActFinalizada = await detalleTiempo.filter(x => x.estado._id == '5f00e4f88c10d277700bcfa3');
            const dataActPausada = await detalleTiempo.filter(x => x.estado._id == '5f03ce10fbd6f3df7d7251b2');

            let inicio, fin;
            let inicioTM, finTM;
            let difTM = 0;
            let difTT = 0;

            function dataTieempoMuerto() {

                return new Promise((resolve, reject) => {

                    inicio = moment([
                        moment(dataActFinalizada[0].inicio).get('year'),
                        moment(dataActFinalizada[0].inicio).get('month'),
                        moment(dataActFinalizada[0].inicio).get('day'),
                        moment(dataActFinalizada[0].inicio).get('hour'),
                        moment(dataActFinalizada[0].inicio).get('minute'),
                        moment(dataActFinalizada[0].inicio).get('second')
                    ]);
                    fin = moment([
                        moment(dataActFinalizada[0].fin).get('year'),
                        moment(dataActFinalizada[0].fin).get('month'),
                        moment(dataActFinalizada[0].fin).get('day'),
                        moment(dataActFinalizada[0].fin).get('hour'),
                        moment(dataActFinalizada[0].fin).get('minute'),
                        moment(dataActFinalizada[0].fin).get('second')
                    ]);

                    difTT = Math.round(((fin.diff(inicio, 'minutes')) / 60) * 100) / 100;

                    if (dataActPausada.length > 0) {

                        dataActPausada.forEach(x => {

                            inicioTM = moment([
                                moment(x.inicio).get('year'),
                                moment(x.inicio).get('month'),
                                moment(x.inicio).get('day'),
                                moment(x.inicio).get('hour'),
                                moment(x.inicio).get('minute'),
                                moment(x.inicio).get('second')
                            ]);
                            finTM = moment([
                                moment(x.fin).get('year'),
                                moment(x.fin).get('month'),
                                moment(x.fin).get('day'),
                                moment(x.fin).get('hour'),
                                moment(x.fin).get('minute'),
                                moment(x.fin).get('second')
                            ]);

                            difTM += Math.round(((finTM.diff(inicioTM, 'minutes')) / 60) * 100) / 100;
                        });
                    }
                    resolve([difTT, difTM]);
                });

            }

            dataTieempoMuerto().then(
                async(data) => {
                    // // Actualizar proyecto, sumarle la horas que se hicieron en el momento
                    await Proyecto.findByIdAndUpdate(dataActFinalizada[0].programacionequipos.programacionproyecto.proyectos._id, {
                        cuentas: dataActFinalizada[0].cuentas,
                        nombreProyecto: dataActFinalizada[0].programacionequipos.programacionproyecto.proyectos.nombreProyecto,
                        miembros: dataActFinalizada[0].programacionequipos.programacionproyecto.proyectos.miembros,
                        tiempoProyectadoPro: dataActFinalizada[0].programacionequipos.programacionproyecto.proyectos.tiempoProyectadoPro,
                        tiempoRealPro: dataActFinalizada[0].programacionequipos.programacionproyecto.proyectos.tiempoRealPro + data[0],
                        tiempoMuerto: dataActFinalizada[0].programacionequipos.programacionproyecto.proyectos.tiempoMuerto + data[1],
                        estado: dataActFinalizada[0].programacionequipos.programacionproyecto.proyectos.estado
                    }, {
                        new: true
                    });

                    // // Actualizar Programacion de proyecto, sumarle esas horas a tiempo real y colocar finalizado
                    await ProgramacionProyecto.findByIdAndUpdate(dataActFinalizada[0].programacionequipos.programacionproyecto._id, {
                        cuentas: dataActFinalizada[0].cuentas,
                        proyectos: dataActFinalizada[0].programacionequipos.programacionproyecto.proyectos._id,
                        actividades: dataActFinalizada[0].programacionequipos.programacionproyecto.actividades._id,
                        tiempoProyectado: dataActFinalizada[0].programacionequipos.programacionproyecto.tiempoProyectado,
                        tiempoReal: data[0],
                        tiempoMuerto: data[1],
                        estado: false
                    }, {
                        new: true
                    });

                }
            );
        }

        const Actividades = await DetalleActividad.find({
                $and: [{
                    cuentas: {
                        $eq: req.body.cuentas
                    }
                }, {
                    estado: { $in: ['5f00e4e58c10d277700bcfa2', '5f00e4c38c10d277700bcfa0', '5f0a934eb250787e784ab1af'] }
                }]
            })
            .populate({
                path: "programacionequipos",
                populate: [{
                        path: "programacionproyecto",
                        select: "proyectos actividades tiempoProyectado tiempoReal tiempoMuerto",
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
                        select: " nombre apellido"
                    }
                ]
            })
            .populate("estado")
            .sort({
                inicio: -1
            });

        io.emit("actividades-actualizada", [Actividades, resultUpdate, req.body.cuentas, req.body.estado, miembro]);
        // io.emit("actividades-actualizadaMiembro", [Actividades.filter(x => x.programacionequipos.miembros._id == miembro), resultUpdate, miembro, req.body.estado]);

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