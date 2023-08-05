const mongoose=require("mongoose");

const SubjectSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, 'Please provide name of the Exam']
    },
    SubjectCode: {
        type: String,
        required: [true, 'Please provide the Subject Code of Subject']
    },
    Syllabus: {
        type: String,
        required: [true, 'Please provide the Syllabus for the subject']
    }
})

const Subject= new mongoose.model('Subject', SubjectSchema);
module.exports=Subject;