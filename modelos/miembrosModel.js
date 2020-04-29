const mongosee = require('mongoose');
const moment = require('moment');
moment.locale('es');

const miembroSchema = new mongosee.Schema({
    cuentas: {
        type: mongosee.Schema.Types.ObjectId,
        ref: 'cuentas',
        required: true
    },
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    usuario: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    correo: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    costoHr: {
        type: Number,
        trim: true,
        required: true,
    },
    perfiles: {
        type: mongosee.Schema.Types.ObjectId,
        ref: 'perfiles',
        required: true
    },
    expertis: {
        type: [String],
        required: true,
    },
    fecha: {
        type: Date,
        default: moment().format("YYYY-MM-DD HH:mm:ss")
    },
    estado: {
        type: Boolean,
        default: true
    }
});
const Miembros = mongosee.model('miembros', miembroSchema);

module.exports = Miembros;