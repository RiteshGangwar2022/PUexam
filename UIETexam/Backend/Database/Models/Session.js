const mongoose = require('mongoose')

const SessionSchema = mongoose.Schema({
    Year: {
        type: Number
    },
    Session: {
        type: String
    },
    AssignedExaminers: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:  'AssignedExaminee'
        }
    }]
})

const Session = mongoose.model('Session', SessionSchema)
module.exports = Session