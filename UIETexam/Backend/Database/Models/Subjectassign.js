const mongoose=require("mongoose");

const Subject = require('./Subject')
const Professor=require("./Professor")


const SubjectassignSchema = new mongoose.Schema({
    Subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    Examiners:[{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Professor'
        }],
})

const Subjectassign =new mongoose.model('Subjectassign', SubjectassignSchema );
module.exports=Subjectassign;



