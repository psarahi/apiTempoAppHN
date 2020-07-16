const mongosee = require('mongoose');
const moment = require('moment');
moment.locale('es');

const detalleActividadSchema = new mongosee.Schema({
    cuentas: {
        type: mongosee.Schema.Types.ObjectId,
        ref: 'cuentas',
        required: true
    },
    programacionequipos: {
        type: mongosee.Schema.Types.ObjectId,
        ref: 'programacionequipos',
        required: true
    },
    descripcion: {
        type: String,
        required: false,
        maxlength: 500
    },
    inicio: {
        type: Date,
        default: moment().format("YYYY-MM-DD HH:mm:ss")
    },
    fin: {
        type: Date,
        default: moment().format("YYYY-MM-DD HH:mm:ss")
    },
    fecha: {
        type: Date,
        default: moment().format("YYYY-MM-DD HH:mm:ss")
    },
    estado: {
        type: mongosee.Schema.Types.ObjectId,
        ref: 'estado',
        required: true
    }
});
const DetalleActividad = mongosee.model('detalleactividad', detalleActividadSchema);

module.exports = DetalleActividad;

// 5e8e2a8a8541e7ecc0b4cece act
// 5e8d7c79e8e365e5ec73a7d0 pro
// 5e8e2c6e8541e7ecc0b4cedb progPro
// 5e8e2e518541e7ecc0b4cedf proe
// 5e8e26574da7bd19843cd34c miembro

// _id
// :
// 5e6af7911c9d440000471fb0
// cuentas
// :
// 5e8e2472ce7ae6c0d4926b8d
// programacionequipos
// :
// 5e8e2e518541e7ecc0b4cedf
// descripcion
// :
// "Breve descripción de lo que hice"
// inicio
// :
// 2020-03-15T06:00:00.000+00:00
// fin
// :
// 2020-03-15T08:00:00.000+00:00
// costo
// :
// 14.3
// estado
// :
// true