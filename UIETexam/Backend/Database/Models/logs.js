const mongoose = require('mongoose')

const LogSchema = new mongoose.Schema({
    _id: {
        type: String,
        ref: 'Professor'
    },
    logs: [{
        _id: {
            type: Date,
            default: Date.now      
        },
        info: {
            type: String
        }
    }]

})
const Log = new mongoose.model('Logs', LogSchema)
module.exports = Log