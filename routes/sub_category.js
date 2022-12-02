const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');


const {
    addsubcategory,
    getalldata,
    sub_viewonedata,
    del_subcategory,
    // 
}=require('../controller/sub_category');



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



router.post('/admin/addsubcategory', uploads.single("image"), addsubcategory);

router.get('/admin/getalldata', getalldata);

router.get('/admin/sub_viewonedata/:id', sub_viewonedata);

router.delete('/admin/del_subcategory/:id', del_subcategory);

module.exports = router;