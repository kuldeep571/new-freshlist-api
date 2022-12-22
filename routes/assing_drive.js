const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const {
    add_drive,
}=require('../controller/assing_drive');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //console.log(file);
      let path = `./uploads`;
      if (!fs.existsSync("uploads")) {
        fs.mkdirSync("uploads");
      }
      cb(null, path);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },  
  });
  
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype.includes("jpeg") ||
      file.mimetype.includes("png") ||
      file.mimetype.includes("jpg")
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  let uploads = multer({ storage: storage });

  let multipleUpload = uploads.fields([
    { name: "deliveryman_img", maxCount: 1 },
    { name: "identity_img", maxCount: 1 },
  ]);




router.post('/admin/add_drive', multipleUpload, add_drive)





module.exports = router;