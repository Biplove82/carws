const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
const path = require("path");
const fs = require("fs");

const mongoURI = "mongodb+srv://biploave:5T91jh2eN1pCAvda@cluster0.rjck8se.mongodb.net/carwash?retryWrites=true&w=majority";

const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Connect to MongoDB
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfsBucket;
conn.once("open", () => {
  console.log("MongoDB Connected ✅");
  gfsBucket = new GridFSBucket(conn.db, { bucketName: "uploads" });
});

// ✅ Configure Multer (Store file in a temporary folder before uploading to GridFS)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Temporarily save file before moving to MongoDB
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single("file");

// ✅ File Upload API
const uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ msg: "File upload failed", error: err });
    if (!req.file) return res.status(400).json({ msg: "Error: No File Selected!" });

    // ✅ Read file from temporary storage and upload to GridFS
    const fileStream = fs.createReadStream(req.file.path);
    const uploadStream = gfsBucket.openUploadStream(req.file.filename);

    fileStream.pipe(uploadStream).on("finish", () => {
      fs.unlinkSync(req.file.path); // ✅ Delete temp file after upload
      res.status(200).json({ msg: "File Uploaded!", filename: req.file.filename });
    });
  });
};

// ✅ File Retrieval API
const getFile = async (req, res) => {
  try {
    if (!gfsBucket) return res.status(500).json({ err: "GridFS is not initialized" });

    // ✅ Find file by filename
    const file = await conn.db.collection("uploads.files").findOne({ filename: req.params.filename });
    if (!file) return res.status(404).json({ err: "No file exists" });

    // ✅ Set proper headers for file type
    res.setHeader("Content-Type", file.contentType || "application/octet-stream");
    res.setHeader("Content-Disposition", `inline; filename="${file.filename}"`);

    // ✅ Stream file from GridFS to response
    const readstream = gfsBucket.openDownloadStream(file._id);
    readstream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: "Error fetching file", details: error });
  }
};


module.exports = { uploadFile, getFile };












