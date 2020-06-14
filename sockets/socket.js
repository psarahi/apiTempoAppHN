const { io } = require('../index');

io.on('connection', (cliente) => {
    console.log('Usuario conectado');

    // cliente.on('disconnect', () => {
    //     console.log('Usuario desconectado');
    // });

    cliente.on('actividades-enCurso', (data) => {

        console.log(data);
        console.log('paso por el socket');

        cliente.emit('actividades-enCurso', data);
    });
});

module.exports = io;