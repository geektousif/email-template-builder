import fs from "fs";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filenameArray = file.originalname.replace(" ", "-").split(".");
    const extension = filenameArray.pop();
    cb(null, filenameArray.join("-") + "-" + uniqueSuffix + "." + extension);
  },
});
// TODO error handling & validation

const upload = multer({ storage });

export default upload;
