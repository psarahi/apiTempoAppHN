const { io } = require('../index');

io.on('connection', (cliente) => {
    console.log('Usuario conectado');

    cliente.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    cliente.on('usuarios-conectados', (data) => {

        cliente.emit('usuarios-conectados', data);
    });

    cliente.on('actividades-enCurso', (data) => {
        cliente.emit('actividades-enCurso', [data, cuenta, miembro]);
    });

    cliente.on('actividades-enCursoMiembro', (data) => {
        cliente.emit('actividades-enCursoMiembro', [data, miembro]);
    });

    cliente.on('actividades-actualizada', (data) => {
        cliente.emit('actividades-actualizada', [data, usuario, cuenta, estado, miembro]);
    });

    cliente.on('actividades-actualizadaMiembro', (data) => {
        cliente.emit('actividades-actualizadaMiembro', [data, usuario, miembro, estado]);
    });

    cliente.on('actividades-calendario', (data) => {
        cliente.emit('actividades-calendario', [dataFinalizada, detalleTiempoMuerto]);
    });

});

module.exports = io;