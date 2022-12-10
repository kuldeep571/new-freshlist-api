const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');



const{
    add_language,
    language_list,
    del_language,
    edit_language,
    viewone_language,
}=require('../controller/language');

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

router.post('/admin/add_language', multipleUpload, add_language);

router.get('/admin/language_list', language_list);

router.delete('/admin/del_language/:id', del_language);

router.post('/admin/edit_language/:id', edit_language);

router.get('/admin/viewone_language/:id', viewone_language);


module.exports = router;  