const mongoose = require("mongoose")

const AssignedExamineeSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professor'
    },
    Subject:{
        type: mongoose.Schema.Types.String,
        ref: 'Subject'
    },
    Pdfkey:{
            type:String
    },
    password: {
        type: String
    },
    IsSelected: {
        type: Number,
        required:true,
        default:0
    }
    ,Name:{
        type:String
    },
    Ispending:{
        type:Boolean,
        required:true,
        default:true
    },
    EncryptionKey:{
            type: String,
    },
    EncryptionIv:{
        type: String,
    },
})

const AssignedExaminee = new mongoose.model('AssignedExaminee', AssignedExamineeSchema)
module.exports = AssignedExaminee