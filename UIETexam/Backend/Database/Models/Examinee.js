const mongoose=require("mongoose");

const ExamineeSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.String,
            ref: 'Professor'
        },
        Exam:[{
                _id: {type: mongoose.Schema.Types.String,
                    ref: 'Exam'
                },
                sessionId: {
                    type: mongoose.Schema.Types.String,
                    ref: 'Session'
                }
             }]
    }
)

const Examinee= new mongoose.model('Examinee', ExamineeSchema);

module.exports=Examinee;