const mongoose=require("mongoose");
const Examinee=require("./Examinee");

const AssignmentSchema=new mongoose.Schema({
  
     assignmentID:{
        type:String,
     },
     name:{
          type: String,
          required:true
     },
    Examinees:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Examinee'
    }]
});

const Assignment =new mongoose.model('Assignment', AssignmentSchema);

module.exports=Assignment;