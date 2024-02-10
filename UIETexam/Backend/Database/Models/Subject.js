const mongoose=require("mongoose");

const SubjectSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, 'Please provide Subject Code']
    },
    Name: {
        type: String,
        required: [true, 'Please provide name of the Exam']
    },
})

const Subject= new mongoose.model('Subject', SubjectSchema);
module.exports=Subject;