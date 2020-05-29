const mongoose = require('mongoose');
const express = require('express');
const app = express();
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

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
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
app.listen(port, () => console.log('Escuchando Puerto: ' + port));


mongoose.connect(
        `mongodb+srv://lesly:Mejia1608@cluster0-g3yej.mongodb.net/tempoApp?retryWrites=true&w=majority`, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }
    )
    .then(() => console.log('Conectado a MongoDb'))
    .catch(error =>

        console.log(error));