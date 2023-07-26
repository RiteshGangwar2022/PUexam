const mongoose=require("mongoose");

const Providers = require('./Examinee')
const Subject = require('./Subject')

const ExamSchema = new mongoose.Schema({
    Subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    ExamCode: {
        type: String,
        required: [true, 'Please provide the Examination Code ']
    },
    Desc: {
        type: String,
        required: [false, 'Description of the Exam']
    },
    DOE:{
        type: Date,
        required: [true, 'Please Provide Date of Examination']
    },
    Type:{
        type: String,
        required: [true, 'Choose one of the following'],
        enum: ["Minor", "Major"],
    },
    //  Can have multiple provider of Q.p
    Providers:[{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Examinee'
        }],
})
const Exam =new mongoose.model('Exam', ExamSchema);

module.exports=Exam;