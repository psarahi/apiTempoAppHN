const mongosee = require('mongoose');
const moment = require('moment');
const jwt = require('jsonwebtoken');
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

miembroSchema.methods.generarJWT = function() {

    return jwt.sign({
        id: this._id,
        nombre: this.nombre,
        apellido: this.apellido,
        usuario: this.usuario,
        idCuenta: this.cuentas,
        fecha: this.fechaRegistro,
        perfil: this.perfiles
    }, 'password');
};

const Miembros = mongosee.model('miembros', miembroSchema);

module.exports = Miembros;