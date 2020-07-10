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
        perfil: this.perfiles,
        token: '',
        menu: obtenerMenu(this.perfiles)
    }, process.env.KEY_API_JWT);
};

const Cuentas = mongosee.model('cuentas', cuentaSchema);

function obtenerMenu(perfil) {
    var menu = [{
            titulo: 'Administración',
            icon: 'audit',
            submenu: [
                { titulo: 'Cuentas', url: '/cuentas' }
            ]
        },
        {
            titulo: 'Tablero',
            icon: 'dashboard',
            submenu: [
                { titulo: 'Actividad', url: '/actividadActiva' },
                { titulo: 'Reporte', url: '/dashboard' },
                { titulo: 'Asiganciones', url: '/asinacion' },
            ]
        },
        {
            titulo: 'Mantenimiento',
            icon: 'tool',
            submenu: [
                { titulo: 'Tus Miembros', url: '/equipo' },
                { titulo: 'Tus Actividades', url: '/actividades' },
                { titulo: 'Tus Proyectos', url: '/proyecto' }
            ]
        }
    ];

    return menu;
}

module.exports = Cuentas;