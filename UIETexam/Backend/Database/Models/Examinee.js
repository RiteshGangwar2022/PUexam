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
                SessionId: {
                    type: mongoose.Schema.Types.String,
                }
             }]
            }
)

const Examinee= new mongoose.model('Examinee', ExamineeSchema);

module.exports=Examinee;