const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// Configure multer to specify where to store uploaded files
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/uploads");
  },
  filename: (req, file, callback) => {
    const filename = `${uuidv4()}_${path.extname(file.originalname)}`;
    callback(null, filename);
  },
});

// Filtering the file types
const fileFilter = (req, file, callback) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

// Create the multer middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;
