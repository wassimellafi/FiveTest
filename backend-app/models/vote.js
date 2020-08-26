const mongoose = require('mongoose')

const VoteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sujet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sujet',
        required: true
    },
    choix: Number,
    date: String
})

module.exports = mongoose.model('Vote', VoteSchema);