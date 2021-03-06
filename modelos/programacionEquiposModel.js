const mongosee = require('mongoose');

const programacionEquiposSchema = new mongosee.Schema({
    programacionproyecto: {
        type: mongosee.Schema.Types.ObjectId,
        ref: 'programacionproyecto',
        required: true
    },
    miembros: {
        type: mongosee.Schema.Types.ObjectId,
        ref: 'miembros',
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

const ProgramacionEquipos = mongosee.model('programacionequipos', programacionEquiposSchema);

module.exports = ProgramacionEquipos;