const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [".jpg", ".jpeg", ".png", ".mp4"];
    let ext = path.extname(file.originalname);

    if (!allowedMimeTypes.includes(ext.toLowerCase())) {
      cb(new Error("Unsupported file type!"), false);
      return;
    }

    cb(null, true);
  },
});
