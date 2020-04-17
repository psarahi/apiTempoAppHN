const mongosee = require('mongoose');

const cuentaSchema = new mongosee.Schema({

    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        trim: true,
        required: true,
        unique: true
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
        required: true
    },
    empresa: {
        type: String
    },
    lugar: {
        type: String,
        required: true
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    perfiles: {
        type: mongosee.Schema.Types.ObjectId,
        ref: 'perfiles',
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

const Cuentas = mongosee.model('cuentas', cuentaSchema);

module.exports = Cuentas;