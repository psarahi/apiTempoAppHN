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
    },
    inicio: {
        type: Date,
        default: moment().subtract(6, 'hour').format("YYYY-MM-DD HH:mm:ss"),
    },
    fin: {
        type: Date,
        default: moment().subtract(6, 'hour').format("YYYY-MM-DD HH:mm:ss")
    },
    costo: {
        type: Number,
        required: true,
    },
    fecha: {
        type: Date,
        default: moment().subtract(6, 'hour').format("YYYY-MM-DD HH:mm:ss")
    },
    estado: {
        type: Boolean,
        default: true
    }
});
const DetalleActividad = mongosee.model('detalleactividad', detalleActividadSchema);

module.exports = DetalleActividad;

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