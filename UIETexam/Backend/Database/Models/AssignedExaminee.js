const mongoose = require("mongoose")

const AssignedExamineeSchema = new mongoose.Schema({
    ExamineeId: {
        type: mongoose.Schema.Types.String,
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
    },
    SessionId:{
        type:String
},
    Name:{
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