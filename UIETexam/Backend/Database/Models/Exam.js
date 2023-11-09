const mongoose=require("mongoose");

const Subject = require('./Subject')
const Professor=require("./Professor")


const ExamSchema = new mongoose.Schema({
    Subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    Branch:{
        type:String,
        required:true,
    },
    option:{
        type:String,
        required:true,
    },
    session:{
        type:String,
        required:true,
    },

    SemesterNo:{
        type:Number,
        required:true,
    },
    ExamCode: {
        type: String,
        required: [true, 'Please provide the Examination Code ']
    },
    DOE:{
        type: Date,
        required: [true, 'Please Provide Date of Examination']
    },

    Ispending:{
         type:Boolean,
         required:true,
         default:true
    },
    Examiners:[{ 
          Exam_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Professor'
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

    }],
    
})

const Exam =new mongoose.model('Exam', ExamSchema);
module.exports=Exam;



