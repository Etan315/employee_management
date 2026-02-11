// middlewares/uploadPDF.js
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the folder "pdf" exists in your root directory
    cb(null, "pdf");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname;
    cb(null, unique);
  }
});

const fileFilter = (req, file, cb) => {
  // Check extension
  if (path.extname(file.originalname).toLowerCase() !== ".pdf") {
    return cb(new Error("Only PDF files are allowed"), false);
  }
  cb(null, true);
};

// ESM Export
const uploadPDF = multer({ storage, fileFilter });
export default uploadPDF;