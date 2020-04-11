const mongosee = require('mongoose');
const cuentasSchema = require('./cuentasModel');

const actividadesSchema = new mongosee.Schema({
    nombre: {
        type: String,
        required: true
    },
    cuentas: {
        type: mongosee.Schema.Types.ObjectId,
        ref: 'cuentas'
    },
    estado: {
        type: Boolean,
        default: true
    }
});

const Actividades = mongosee.model('actividades', actividadesSchema);

module.exports = Actividades;

// 5e8e21a3ce7ae6c0d4926b87 SA
// 5e8e2246ce7ae6c0d4926b89 A
// 5e8e22d0ce7ae6c0d4926b8a R
// 5e8e222fce7ae6c0d4926b88 U

// lguerra 5e8e236fce7ae6c0d4926b8b
// Bayron 5e8e2472ce7ae6c0d4926b8d
// polo 5e8e23ebce7ae6c0d4926b8c