const mongoose=require("mongoose");

const ExamineeSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Professor'
        },
        Exam:[{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Exam'
             }]
    }
)

const Examinee= new mongoose.model('Examinee', ExamineeSchema);

module.exports=Examinee;