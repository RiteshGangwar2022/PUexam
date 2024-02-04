const express = require("express");
const router = express.Router();
const Exam = require("../Database/Models/Exam");
const { ObjectId } = require('mongodb');

// aws-sdk S3 setup
const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const {Upload} = require("@aws-sdk/lib-storage")

const multer = require("multer");
const multerS3 = require("multer-s3");

const BUCKET = process.env.BUCKET;
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_SECRET,
  },
  region: process.env.REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: BUCKET,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});



// other routes
const {
  Login,
  Signup,
  verifyOtp,
  GetAssignments,
  SingleAssignment,
  ModifySelect
} = require("../controller/examiner");

router.post("/login", Login);
router.post("/register", Signup);
router.post("/verifyOtp", verifyOtp);
router.get("/assignments/:id", GetAssignments);
router.get("/singleassignment/:id", SingleAssignment);
router.put("/ModifySelect/:id/:index", ModifySelect);


// Encryption
// ----------------------------------------------------------------------------------------
const PDFDocument = require("pdf-lib-plus-encrypt").PDFDocument
const crypto = require('crypto');
const { NONAME } = require("dns");


async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

const EncryptPdf = async function(pdfData, password){
  pdfData = 'data:application/pdf;base64,' + pdfData.toString('base64')
  const pdfDoc = await PDFDocument.load(pdfData)
  await pdfDoc.encrypt({
    userPassword: password,
    permissions: {modifying: true},
  })
  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}
const GetEncryptPdf =  async function(pdfData, password){
  file = await EncryptPdf(pdfData, password) 
  return file
}
// --------------------------------------------------------------------------------------------

// 
// to upload file on aws
router.post("/upload", upload.single('file'), async (req, res) => {
  try {
    const _id = req.query._id; // Replace with the actual exam _id
    const examinerId = req.query.examiner_id;

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let password = 123
    let pkey = req.file.key
    // Encryption
    // -------------------------------------------------------------------------------------------
    try{
      console.log()
      console.log('Starting Encryption')
      const Encfile = async() =>{
        const res = await fetch(`http://localhost:5000/api/r2/pdf/${req.file.key}`)
        return res.json()
      }
      data = await Encfile()
      password = crypto.randomBytes(16).toString('hex')
      const Encpdf = await GetEncryptPdf(data, password)
      console.log(Encpdf)
      // Now I want to update the existing pdf in AWS bucket
      // Itta hissa glt hai
      data = {
        Bucket: BUCKET,
        Key: req.file.key,
        Body: Encpdf,
      }

      try{
        const response = await new Upload({client: s3, params: data})
        await response.done()
        console.log(response)
      }catch(err){
          console.log(err)
      }
      
    } catch(err){
      console.error(err)
      return res.json(200).json({error: "Error encrypting document"})
    }
    // -----------------------------------------------------------------------------------------------

    try {
      const result = await Exam.updateOne(
        { "_id": new ObjectId(_id), "Examiners.Exam_id": new ObjectId(examinerId) },
        { $set: { "Examiners.$.Ispending": false } }
      );

      // Log additional information for debugging
      console.log('Update Result:', result);

      if (result.nModified === 0) {
        return res.status(404).json({ error: "Document not found or no modifications made" });
      }
      
      return res.status(200).json({ message: "Document updated successfully", file: req.file, password: password, key: req.file.key});
    } catch (err) {
      console.error('Error updating document:', err);
      return res.status(500).json({ error: "Error updating document" });
    }
  } catch (err) {
    console.error('Error in file upload:', err);
    return res.status(400).json({ success: false, message: "File upload failed." });
  }
});


// get File from AWS bucket for encryption
const GetUploadedPdf = async (req, res) => {
  const { key } = req.params;
    //console.log(key)
    const params = {
      Bucket: BUCKET,
      Key: key,
    };
  
    try {
      const { Body } = await s3.send(new GetObjectCommand(params));
  
  
      const pdfData = await streamToBuffer(Body);
     // console.log("PDF data:", pdfData.toString("base64"));
       //console.log("got pdf")
      res.status(200).json(pdfData.toString("base64"));
      //get pdf file in base64 format and fetch it on frontend
    } catch (err) {
      console.error(err);
      res.status.json({message:"not pdf found"})
    }
}


router.get("/pdf/:key", GetUploadedPdf)
module.exports = router;
