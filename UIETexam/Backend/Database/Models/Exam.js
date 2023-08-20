const mongoose=require("mongoose");

const Subject = require('./Subject')
const Professor=require("./Professor")


const ExamSchema = new mongoose.Schema({
    Subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    ExamCode: {
        type: String,
        required: [true, 'Please provide the Examination Code ']
    },
    DOE:{
        type: Date,
        required: [true, 'Please Provide Date of Examination']
    },
    Providers:[{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Professor'
        }],
})

const Exam =new mongoose.model('Exam', ExamSchema);
module.exports=Exam;



