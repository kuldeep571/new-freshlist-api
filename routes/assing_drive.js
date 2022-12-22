const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const {
    add_drive,
    getall_drive,
    viewone_drive,
    del_drive,
    edit_drive,
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

router.get('/admin/getall_drive', getall_drive)

router.get('/admin/viewone_drive/:id', viewone_drive)

router.delete('/admin/del_drive/:id', del_drive)

router.post('/admin/edit_drive/:id', multipleUpload, edit_drive)





module.exports = router;