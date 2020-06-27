const { io } = require('../index');

io.on('connection', (cliente) => {
    console.log('Usuario conectado');

    // cliente.on('disconnect', () => {
    //     console.log('Usuario desconectado');
    // });

    cliente.on('actividades-enCurso', (data) => {
        cliente.emit('actividades-enCurso', data);
    });

    cliente.on('actividades-terminada', (data) => {
        cliente.emit('actividades-terminada', data);
    });

});

module.exports = io;