const multer = require("multer");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + Date.now())
  },
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  }
});

const fileFilter = (req, file, cb) => {

  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } 

  else {
    cb(null, false);
    const err = new Error('Only .png, .jpg and .jpeg format allowed!')
    return cb(err);
  }
}

const upload = multer({
  storage : storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
  fileFilter: fileFilter,
});

module.exports = upload;