require('dotenv').config();
const mongoose = require('mongoose');

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();

let server = http.createServer(app);

module.exports.io = socketIO(server);
require('./sockets/socket');

const inicio = require('./routers/inicio');
const actividades = require('./routers/actividades');
const cuenta = require('./routers/cuentas');
const miembros = require('./routers/miembros');
const perfil = require('./routers/perfil');
const programacionEquipos = require('./routers/programacionEquipos');
const programacionProyectos = require('./routers/programacionProyecto');
const proyectos = require('./routers/proyecto');
const detalleActividad = require('./routers/detalleActividad');
const auth = require('./routers/autentificacion');

app.use(express.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('', inicio);
app.use('/api/actividades', actividades);
app.use('/api/cuentas', cuenta);
app.use('/api/miembros', miembros);
app.use('/api/perfiles', perfil);
app.use('/api/programacionEquipos', programacionEquipos);
app.use('/api/programacionProyectos', programacionProyectos);
app.use('/api/proyectos', proyectos);
app.use('/api/detalleActividad', detalleActividad);
app.use('/api/auth', auth);

const port = process.env.PORT || 3003;
server.listen(port, () => console.log('Escuchando Puerto: ' + port));

mongoose.connect(
        `mongodb+srv://lesly:${process.env.PASS_MONGO}@cluster0-g3yej.mongodb.net/tempoApp?retryWrites=true&w=majority`, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }
    )
    .then(() => console.log('Conectado a MongoDb'))
    .catch(error =>

        console.log(error));