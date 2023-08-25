// import { docx } from 'docx'
import { Document, Packer, Paragraph, TextRun, SectionType, AlignmentType} from 'docx'

import { saveAs } from "file-saver"

const numbersToWords = {
    1: "First",
    2: "Second",
    3: "Third",
    4: "Fourth",
    5: "Fifth",
    6: "Sixth",
    7: "Seventh",
    8: "Eighth",
    9: "Ninth",
    10: "Tenth",
    11: "Eleventh",
    12: "Twelfth",
}

// style
const DocFont = "Times Roman"


function saveDocumentToFile(doc, filename){
    // Create new instance of Packer for the docx module
    // const packer = new Packer()
    // Create a mime type that will associate the new file with Microsoft Word
    const mimeType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    // Create a Blob containing the Document instance and the mimeType
    Packer.toBlob(doc).then(blob => {
        const docblob = blob.slice(0, blob.size, mimeType)
        // Save the file using saveAs from the file-saver package
        saveAs(docblob, filename)
    })
}

function generate(info){
    console.log(info)
    const ExamCode = info.ExamCode
    const SubCode = info.Subject.SubjectCode
    const PaperCode = 0
    const BranchName = "BranchName"
    const SemesterNo = 4
    const SubjectName = info.Subject.Name
    const filename = `${BranchName}-${SemesterNo}-${SubCode}`

    const ExamCodeline = new TextRun({
        text: `Exam.Code: ${ExamCode}`,
        size: "22px",
        font: DocFont,
    })
    const SubCodeline = new TextRun({
            text: `Sub.Code: ${SubCode}`,
            size: "22px",
            font: DocFont,
    })

    const PaperCodeline = new TextRun({
        text: `${PaperCode}`,
        size: "22px",
        font: DocFont,
    })

    const Branchline = new TextRun({
        text: `${BranchName}`,
        size: "22px",
        font: DocFont,
    })
    const Semesterline = new TextRun({
        text: `${numbersToWords[SemesterNo]} Semester`,
        size: "22px",
        font: DocFont,
    })
    const Subjectline = new TextRun({
        text: `${SubjectName}`,
        size: "22px",
        font: DocFont,
    })
        
    const doc = new Document({
        sections: [
            {
                properties: { type: SectionType.CONTINUOUS},
                children: [
                    new Paragraph({children: [ExamCodeline], alignment: AlignmentType.RIGHT}),
                    new Paragraph({children: [SubCodeline], alignment: AlignmentType.RIGHT}),
                    new Paragraph({children: [new TextRun({text: "Panjab University", bold: true, font: DocFont})], alignment: AlignmentType.CENTER}),
                    new Paragraph({children: [PaperCodeline], alignment: AlignmentType.CENTER}),
                    new Paragraph({children: [Branchline], alignment: AlignmentType.CENTER}),
                    new Paragraph({children: [Semesterline], alignment: AlignmentType.CENTER}),
                    new Paragraph({children: [Subjectline], alignment: AlignmentType.CENTER}),
                    new Paragraph({children: [new TextRun({text: "Note:", bold: true, italics: true, font: DocFont})], alignment: AlignmentType.LEFT}),      
                ]
            },
        ],
    });                
    saveDocumentToFile(doc, `${filename}.docx`)
}

export {generate}