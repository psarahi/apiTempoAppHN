const mongosee = require('mongoose');
const moment = require('moment');
const jwt = require('jsonwebtoken');
// const { obtenerMenu } = require('../modelos-extras/menu');

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
        perfil: this.perfiles,
        token: '',
        menu: obtenerMenu(this.perfiles)
    }, process.env.KEY_API_JWT);
};

const Miembros = mongosee.model('miembros', miembroSchema);

function obtenerMenu(perfil) {
    console.log(perfil);
    var menu;
    if (perfil != '5e8e222fce7ae6c0d4926b88') {
        menu = [{
                titulo: 'Tablero',
                icon: 'dashboard',
                submenu: [
                    { titulo: 'Actividad', url: '/actividadActiva' },
                    { titulo: 'Calendario', url: '/dashboard' },
                    { titulo: 'Asiganciones', url: '/asinacion' },
                ]
            },
            {
                titulo: 'Reportes',
                icon: 'bar-chart',
                submenu: [
                    { titulo: 'Diario', url: '/reporteDiarioAdmin' },
                    // { titulo: 'Tus Actividades', url: '/actividades' },
                    // { titulo: 'Tus Proyectos', url: '/proyecto' }
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
    } else {

        menu = [{
                titulo: 'Tablero',
                icon: 'dashboard',
                submenu: [
                    { titulo: 'Actividad', url: '/actividadActiva' },
                    { titulo: 'Calendario', url: '/dashboard' },
                    { titulo: 'Asiganciones', url: '/asinacion' },
                ]
            },
            {
                titulo: 'Reportes',
                icon: 'bar-chart',
                submenu: [
                    { titulo: 'Diario', url: '/reporteDiario' },
                    // { titulo: 'Tus Actividades', url: '/actividades' },
                    // { titulo: 'Tus Proyectos', url: '/proyecto' }
                ]
            },
        ];
    }


    return menu;
}

module.exports = Miembros;