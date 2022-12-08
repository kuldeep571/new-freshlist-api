const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');


const {
    addbrand,
    brandlist,
    del_brand,
    viewone_brand,
    edit_brand,
}=require('../controller/brand');


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
    { name: "image", maxCount: 1 },
   
  ]);


  router.post('/admin/addbrand', multipleUpload, addbrand);
  router.get('/admin/brandlist', brandlist);
  router.get('/admin/viewone_brand/:id', viewone_brand);
  router.post('/admin/edit_brand/:id', uploads.single("image"), edit_brand);
  router.delete('/admin/del_brand/:id', del_brand);
//console


module.exports = router;