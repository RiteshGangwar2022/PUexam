const mongoose=require("mongoose");

const SubjectassignSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.String,
        ref: 'Subject'
    },
    Examiners:[{ 
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Professor'
        }
    }],
})

const Subjectassign =new mongoose.model('Subjectassign', SubjectassignSchema );
module.exports=Subjectassign;



