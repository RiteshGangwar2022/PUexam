const mongoose=require("mongoose");

const ExamSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.String,
        ref: 'Subject'
    },
     Subject_name:{
       type:String,
       required:true,
    },
    Branch:{
        type:String,
        required:true,
    },
    Option:{
        type:String,
        required:true,
    },
    SessionInfo:{
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
    Sessions:[{ 
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Session",
          }
    }],
})

const Exam =new mongoose.model('Exam', ExamSchema);
module.exports=Exam;



