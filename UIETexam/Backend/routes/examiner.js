const express = require("express");
const router = express.Router();
const Exam = require("../Database/Models/Exam");
const { ObjectId } = require('mongodb');

// aws-sdk S3 setup
const { S3Client } = require("@aws-sdk/client-s3");
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

// to upload file on aws
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const _id = req.query._id; // Replace with the actual exam _id
    const examinerId = req.query.examiner_id;
 

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

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

      return res.status(200).json({ message: "Document updated successfully" });
    } catch (err) {
      console.error('Error updating document:', err);
      return res.status(500).json({ error: "Error updating document" });
    }
  } catch (err) {
    console.error('Error in file upload:', err);
    return res.status(400).json({ success: false, message: "File upload failed." });
  }
});

module.exports = router;
