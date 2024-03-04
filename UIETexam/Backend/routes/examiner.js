const express = require("express");
const router = express.Router();
const Exam = require("../Database/Models/Exam");
const { ObjectId } = require('mongodb');

// aws-sdk S3 setup
const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");

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


// Encryption and Password 
// ----------------------------------------------------------------------------------------
const PDFDocument = require("pdf-lib-plus-encrypt").PDFDocument
const crypto = require('crypto');
const { default: mongoose } = require("mongoose");


async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

const PwdPdf = async function(pdfData, password){
  pdfData = 'data:application/pdf;base64,' + pdfData
  const pdfDoc = await PDFDocument.load(pdfData)
  await pdfDoc.encrypt({
    userPassword: password,
    permissions: {modifying: true},
  })
  const pdfBytes = await pdfDoc.saveAsBase64()
  return pdfBytes
}
const GetPwdOnPdf =  async function(pdfData, password){
  file = await PwdPdf(pdfData, password) 
  return file
}

const algorithm = 'aes-256-cbc'
const EncryptPdf = async function(b64, key, inVec){
  const cipherText = crypto.createCipheriv(algorithm, key, inVec)
  return cipherText.update(b64, 'base64', 'base64') + cipherText.final('base64')
}
// --------------------------------------------------------------------------------------------

// 
// to upload file on aws

router.post("/upload", multer().single('file'), async function(req, res) {
  // Encrypting and appliying password
  try{
    if (!req.file){
      return res.status(400).json({error: "No file upload"})
    }
    // applying password on pdf
    const b64 = req.file.buffer.toString('base64')
    const password = crypto.randomBytes(16).toString('hex')
    const pwdpdf = await GetPwdOnPdf(b64, password)

    // Encrypting the pdf
    const Key = crypto.randomBytes(32)
    const inVec = crypto.randomBytes(16)
    const Encpdf = await EncryptPdf(pwdpdf, Key, inVec) 

    // upload pdf to Aws
    let data = {
        "Bucket": BUCKET,
        "Key": Date.now().toString() + "-" + req.file.originalname,
        "Body": Encpdf,
        // "ServerSideEncryption": "AES256"
    }
    try{
      const command = new PutObjectCommand(data);
      const response = await s3.send(command);
    }catch(err){
      return res.status(200).json({error: `Error in uploading file to AWS ${err}`})
    }

    const _id = req.query.id
    const examinerId = req.query.examiner_id
    console.log(examinerId)
    // updating in Mongo
    try{
      const result = await Exam.updateOne(
        {"_id": new ObjectId(_id), "Examiners._id": new ObjectId(examinerId)},
        {$set: {
          "Examiners.$.Ispending": false,
          "Examiners.$.Pdfkey": data.Key,
          "Examiners.$.EncryptionKey": Key.toString('base64'),
          "Examiners.$.EncryptionIv": inVec.toString('base64'),
          "Examiners.$.password": password,
        }}
      )
      console.log("result", result)
      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: "Document not found or no modifications made" });
      }
      return res.status(200).json({ message: "Document updated successfully", Encfile: Encpdf, password: password, Pdfkey: data['Key'], SecKey: Key.toString('base64'), Iv: inVec.toString('base64'), examid: _id});
    } catch (err) {
      console.error('Error updating document:', err);
      return res.status(500).json({ error: "Error updating document" });
    }
    // upload pdf to 
  }catch(err){
    return res.status(400).json({error: `Error in Uploading file${err}`})
  }
});
module.exports = router;
