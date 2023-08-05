const mongoose=require("mongoose");
const Exam=require("Exam");

const Professor=require("Professor");

const ExamineeSchema = new mongoose.Schema(
    {
        Professor:{
            type: mongoose.Schema.Types.ObjectId,
            ref: ''
        },
        Exam:[{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Exam'
             }]
        
        
    }
)

const Examinee= new mongoose.model('Examinee', ExamineeSchema);

module.exports=Examinee;