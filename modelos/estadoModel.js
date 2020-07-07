const mongosee = require('mongoose');

const estadosSchema = new mongosee.Schema({

    nombre: {
        type: String,
        required: true
    },
});

const Estado = mongosee.model('estado', estadosSchema);

module.exports = Estado;