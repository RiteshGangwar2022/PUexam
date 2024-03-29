const mongoose = require('mongoose')

const SessionSchema = mongoose.Schema({
    Year: {
        type: Number
    },
    Session: {
        type: String
    },
    DOE: {
        type: String
    },
    AssignedExaminers: [{
        _id: {
            type: mongoose.Schema.Types.String,
            ref:  'AssignedExaminee'
        },
    }]
})

const Session = mongoose.model('Session', SessionSchema)
module.exports = Session