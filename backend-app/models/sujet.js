const mongoose = require('mongoose');

const sujetSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titre: String,
    description: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Sujet', sujetSchema)