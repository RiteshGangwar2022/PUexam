const express = require("express");
const router = express.Router();
const Exam = require("../Database/Models/Exam");

//aws-sdk S3 setup
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
// S3 initiailization
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

//to upload file on aws
const AwsUpload =  async (req, res) => {
  
  // console.log(req.body);
   try {
     const _id = req.body.examid;
     console.log(_id);
     
    
    // Update a document by ID
     const storeId = _id;
     try {
       // Find the document by ID and update it
       const result = await Exam.updateOne(
         { _id:storeId},
         {
           $set: {
             Pdfkey: req.file.key,
             Ispending: false,
           },
         }
       );
       if (result.modifiedCount === 0) {
         return res.status(404).json({ error: "Document not found" });
       }
       return res.status(200).json({ message: "Document updated successfully" });
     } catch (err) {
       console.error(err);
       return res.status(500).json({ error: "Error updating document" });
     }
     
   } catch (err) {
     console.log(err);
     res.status(400).json({ success: false, message: "File upload failed." });
   }
 }

// Mongo storage initilization
const mongoose = require("mongoose")
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage
const crypto = require("crypto")

let gfs;
mongoose.connection.on("connected", () => {
  var client = mongoose.connections[0].client
  var db = mongoose.connections[0].db
  gfs = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "uploads"
  })
})


const Storage = new GridFsStorage({
  url: process.env.DBurl,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename = buf.toString('hex') + file.originalname
        const fileinfo = {
          filename: filename,
          bucketName: "uploads",
        }
        resolve(fileinfo)
      })
    })
  }

})
const uploadMongo = multer({storage: Storage})

 // to upload file on Mongo
const MongoUpload = async (req, res) => {
  try {
    const _id = req.body.examid;
    console.log(_id);
    console.log(req.file)
    console.log(req.file.filename)

   // Update a document by ID
    const storeId = _id;
    try {
      // Find the document by ID and update it
      console.log("Document uploaded to MongoDb successfully")
      const Encfile = async () => {
        const res = await fetch(`http://localhost:5000/api/r2/uploadMongo/${req.file.filename}`)
        return res.json()
      }
      const data = await Encfile()
      console.log(data)
    
      const result = await Exam.updateOne(
        { _id:storeId},
        {
          $set: {
            Pdfkey: req.file.filename,
            Ispending: true, // want to still upload to Aws server
            password: data.password,
          },
        }
      );
      //console.log(result)
      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: "Document not found" });
      }
      const Response = {
        message: "File Encryption Successfull",
        data: data.data,
        examid: _id,
        pdfKey: req.file.key,
      }
      return res.status(200).json(Response);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error updating document" });
    }

  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "File upload to Mongo failed." });
  }
}

async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}
const PDFDocument = require('pdf-lib-plus-encrypt').PDFDocument
const EncryptPdf = async function (pdfData, password) {
  pdfData = 'data:application/pdf;base64,' + pdfData.toString('base64')
  const pdfDoc = await PDFDocument.load(pdfData)
  await pdfDoc.encrypt({
    userPassword: password,
    permissions: { modifying: true },
  })
  const pdfBytes = await pdfDoc.saveAsBase64()
  return pdfBytes
}

const GetUploadedPdf =  async (req, res) => {
  const filename = req.params.filename
  const stream = gfs.openDownloadStreamByName(filename)
  const pdfData = await streamToBuffer(stream)
  let password = crypto.randomBytes(16).toString('hex')
  console.log(password)
  const encryptPdfData = await EncryptPdf(pdfData, password)
  console.log("pdf Encryption Completed")
  res.status(200).json(
    {
      data: encryptPdfData,
      password: password,
    }
    );
}

//other routes
const {
  Login,
  Signup,
  verifyOtp,
  GetAssignments,
  SingleAssignment,
} = require("../controller/examiner");
const { get } = require("http");

router.post("/login", Login);
router.post("/register", Signup);
router.post("/verifyOtp", verifyOtp);
router.get("/assignments/:id", GetAssignments);
router.get("/singleassignment/:id", SingleAssignment);

router.post("/uploadMongo", uploadMongo.single("file"), MongoUpload)
router.post("/upload", upload.single("file"), AwsUpload);

router.get("/uploadMongo/:filename", GetUploadedPdf)

module.exports = router;