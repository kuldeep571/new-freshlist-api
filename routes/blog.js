const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const {
    addblog,
    del_blog,
    getall_blog, 
    viewone_blog,
    editblog
}= require('../controller/bolg');

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

//   let multipleUpload = uploads.fields([
//     { name: "thumbnail_img", maxCount: 1 },
   
//   ]);




router.post('/admin/addblog', uploads.single("thumbnail_img"), addblog);

router.get('/admin/getall_blog', getall_blog);

router.get('/admin/viewone_blog/:id', viewone_blog);

router.delete('/admin/del_blog/:id', del_blog);

router.post('/admin/editblog/:id', uploads.single("thumbnail_img"), editblog);






module.exports = router;