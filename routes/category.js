const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');


const {
    addcategory,
    getallcategory,
    viewonecategory,
    edit_category,
    del_one_category,
    category_true_false,
}=require('../controller/category');



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
    { name: "thumbnail_img", maxCount: 1 },
   
  ]);



router.post('/admin/addcategory', multipleUpload, addcategory);
router.get('/admin/getallcategory', getallcategory);
router.get('/admin/viewonecategory/:id', viewonecategory);
router.post('/admin/edit_category/:id', uploads.single("image"), edit_category);
router.delete('/admin/del_one_category/:id', del_one_category);
router.post('/admin/category_true_false/:id', category_true_false);




module.exports = router;