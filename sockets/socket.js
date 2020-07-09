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
        cliente.emit('actividades-enCurso', [data, cuenta]);
    });

    cliente.on('actividades-actualizada', (data) => {
        cliente.emit('actividades-actualizada', [data, usuario, cuenta, estado]);
    });


    cliente.on('actividades-calendario', (data) => {
        cliente.emit('actividades-calendario', data);
    });

});

module.exports = io;