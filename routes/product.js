const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');


const{
    addproduct,
    product_list,
    del_product,
    edit_product,
    viewone_product,
}=require('../controller/proudct');



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

  // let multipleUpload = uploads.fields([
  //   { name: "image", maxCount: 1 },
  //   { name: "thumbnail_img", maxCount: 1 },
   
  // ]);


router.post('/admin/addproduct',  uploads.single("product_image"), addproduct);

router.get('/admin/product_list', product_list);

router.get('/admin/viewone_product/:id', viewone_product);

router.delete('/admin/del_product/:id', del_product);

router.post('/admin/edit_product/:id', uploads.single("product_image"), edit_product);

module.exports = router;  