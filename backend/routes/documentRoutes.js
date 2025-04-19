const express=require("express");
const router=express.Router();
const {uplaod}=require("../");
const { upload } = require("../middleware/upload");
const { uploadDocument } = require("../controllers/documentUploadController");

router.post("/upload", upload, uploadDocument);


module.exports = router;