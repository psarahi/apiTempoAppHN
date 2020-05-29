const mongosee = require('mongoose');
const moment = require('moment');
const jwt = require('jsonwebtoken');

moment.locale('es');

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
        default: moment().format("YYYY-MM-DD HH:mm:ss")
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

cuentaSchema.methods.generarJWT = function() {

    return jwt.sign({
        id: this._id,
        nombre: this.nombre,
        apellido: this.apellido,
        usuario: this.usuario,
        idCuenta: this._id,
        fecha: this.fechaRegistro,
        perfil: this.perfiles
    }, 'password');
};

const Cuentas = mongosee.model('cuentas', cuentaSchema);

module.exports = Cuentas;