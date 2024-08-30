const mongoose = require('mongoose');

const eleitorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    etitulo: {
        type: String,
        required: true
    },
    vote: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Eleitor', eleitorSchema);
