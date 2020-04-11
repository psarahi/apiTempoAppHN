const mongoose = require('mongoose');
const express = require('express');
const app = express();
const actividades = require('./routers/actividades');
const cuenta = require('./routers/cuentas');
const miembros = require('./routers/miembros');
const perfil = require('./routers/perfil');
const programacionEquipos = require('./routers/programacionEquipos');
const programacionProyecto = require('./routers/programacionProyecto');
const proyecto = require('./routers/proyecto');

app.use(express.json());
app.use('/api/actividades', actividades);
app.use('/api/cuentas', cuenta);
app.use('/api/miembros', miembros);
app.use('/api/perfil', perfil);
app.use('/api/programacionEquipos', programacionEquipos);
app.use('/api/programacionProyecto', programacionProyecto);
app.use('/api/proyecto', proyecto);

const port = process.env.PORT || 3003;
app.listen(port, () => console.log('Escuchando Puerto: ' + port));

mongoose.connect(
        'mongodb+srv://lesly:Mejia1608@cluster0-g3yej.mongodb.net/tempoApp?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }
    )
    .then(() => console.log('Conectado a MongoDb'))
    .catch(erro => console.log('No se ha conectado a MongoDb'));