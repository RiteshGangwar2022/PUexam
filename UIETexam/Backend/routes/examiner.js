const express = require("express");
const router = express.Router();
const Exam = require("../Database/Models/Exam");

//aws-sdk S3 setup
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
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

//other routes
const {
  Login,
  Signup,
  verifyOtp,
  GetAssignments,
  SingleAssignment,
} = require("../controller/examiner");

router.post("/login", Login);
router.post("/register", Signup);
router.post("/verifyOtp", verifyOtp);
router.get("/assignments/:id", GetAssignments);
router.get("/singleassignment/:id", SingleAssignment);

//to upload file on aws

router.post("/upload", upload.single("file"), async (req, res) => {
  
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
      //console.log(result)

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
});
module.exports = router;
