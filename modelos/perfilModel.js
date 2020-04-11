const mongosee = require('mongoose');

const perfilSchema = new mongosee.Schema({

    nombre: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }

});

const Perfil = mongosee.model('perfiles', perfilSchema);

module.exports = Perfil;