const mongosee = require('mongoose');

const programacionProyectoSchema = new mongosee.Schema({
    cuentas: {
        type: mongosee.Schema.Types.ObjectId,
        ref: 'cuentas',
        required: true
    },
    proyectos: {
        type: mongosee.Schema.Types.ObjectId,
        ref: 'proyectos',
        required: true
    },
    actividades: {
        type: mongosee.Schema.Types.ObjectId,
        ref: 'actividades',
        required: true
    },
    tiempoProyectado: {
        type: Number,
        required: true
    },
    tiempoReal: {
        type: Number,
        default: 0
    },
    estado: {
        type: Boolean,
        default: true
    }
});

const ProgramacionProyecto = mongosee.model('programacionproyecto', programacionProyectoSchema);

module.exports = ProgramacionProyecto;