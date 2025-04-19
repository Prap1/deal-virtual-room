const Document = require("../model/document");

exports.uploadDocument = async (req, res) => {
  try {
    const { dealId } = req.body;
    const userId = req.user.userId; // assuming you use auth middleware

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = `/uploads/${req.file.filename}`;

    const document = await Document.create({
      dealId,
      uploadedBy: userId,
      fileName: req.file.originalname,
      fileUrl: filePath,
      accessControl: {
        [userId]: true, // only uploader has access initially
      },
    });

    res.status(201).json({
      message: "Document uploaded and saved successfully",
      document,
    });
  } catch (error) {
    console.error("Upload Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
