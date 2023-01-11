const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');


const {
    add_vendor,
    getall_vendor,
    viewone_vendor,
    del_vendor,
    edit_vendor
}=require('../controller/vendor');

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
    { name: "vendor_img", maxCount: 1 },
    { name: "shop_logo", maxCount: 1 },
    { name: "shop_banner", maxCount: 1 },
  ]);




router.post('/admin/add_vendor', multipleUpload, add_vendor);

router.get('/admin/getall_vendor', getall_vendor);

router.get('/admin/viewone_vendor/:id', viewone_vendor);

router.delete('/admin/del_vendor/:id', del_vendor)

router.post('/admin/edit_vendor/:id', multipleUpload, edit_vendor)


module.exports = router;

//console