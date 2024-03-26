import multer from "multer";
import path from "path";
import fs from "fs";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";

    fs.access(uploadDir, (err) => {
      if (err && err.code === "ENOENT") {
        fs.mkdir(uploadDir, { recursive: true }, (mkdirErr) => {
          if (mkdirErr) {
            console.error("Error creating uploads folder:", mkdirErr);
            // Provide a default destination if error occurs
            cb(null, "default_destination/");
          } else {
            cb(null, uploadDir);
          }
        });
      } else if (err) {
        console.error("Error accessing uploads folder:", err);
        // Provide a default destination if error occurs
        cb(null, "default_destination/");
      } else {
        cb(null, uploadDir);
      }
    });
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Use the original filename
  },
});
