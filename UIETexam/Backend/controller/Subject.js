const Subject = require("../Database/Models/Subject")

exports.createSubject = (req, res) =>{
    const {Name, SubjectCode, Syllabus} = req.body;
    let syllabus = ""
    const subject = new Subject({
        Name, 
        SubjectCode,
        Syllabus,
    });

    subject.save((error, subject)=> {
        if (error) return res.status(400).json({error})
        if (subject){
            res.status(201).json({subject})
        }
    })
}
