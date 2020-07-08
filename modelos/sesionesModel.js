const mongosee = require('mongoose');
const moment = require('moment');

moment.locale('es');

const sesioneSchema = new mongosee.Schema({
    cuentas: {
        type: mongosee.Schema.Types.ObjectId,
        ref: 'cuentas',
        required: true
    },
    miembros: {
        type: mongosee.Schema.Types.ObjectId,
        ref: 'miembros',
        required: true
    },
    fechaLogin: {
        type: Date,
        default: moment().format("YYYY-MM-DD HH:mm:ss")
    },
    fechaLoginTemp: {
        type: Date,
        default: moment().format("YYYY-MM-DD HH:mm:ss")
    },
    fechaLogout: {
        type: Date,
        default: moment().format("YYYY-MM-DD HH:mm:ss")
    },
    tiempoLogin: {
        type: Number,
        default: 0
    },
    estado: {
        type: Boolean,
        default: true
    }
});

const Sesiones = mongosee.model('sesione', sesioneSchema);

module.exports = Sesiones;