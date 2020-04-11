const mongosee = require('mongoose');

const proyectoSchema = new mongosee.Schema({
    cuentas: {
        type: mongosee.Schema.Types.ObjectId,
        ref: 'cuentas',
        required: true
    },
    nombreProyecto: {
        type: String,
        required: true
    },
    miembros: {
        type: mongosee.Schema.Types.ObjectId,
        ref: 'miembros',
        required: true
    },
    tiempoProyectadoPro: {
        type: Number,
        required: true
    },
    tiempoRealPro: {
        type: Number,
        default: 0
    },
    presuProyectadoPro: {
        type: Number,
        required: true
    },
    presupuestoRealPro: {
        type: Number,
        default: 0
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: Boolean,
        default: true
    }
});

const Proyectos = mongosee.model('proyectos', proyectoSchema);

module.exports = Proyectos;