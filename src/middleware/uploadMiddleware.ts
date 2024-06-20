import multer from "multer";

// Multer configuration for file uploads on disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // Save files in this directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save files with their original names
  },
});

export const upload = multer({ storage });
