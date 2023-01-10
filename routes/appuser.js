const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const{
    vender_sendotp,
    vender_veryfyotp,
    vender_register,
    vender_register_img,
    vender_getlist,
    vender_getviewone,
    vender_deleteone,
    vender_login,
}=require("../controller/appuser");

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
    { name: "vendoor_img", maxCount: 2 },
    { name: "adhar_img_front", maxCount: 2 },
    { name: "adhar_img_back", maxCount: 2 },
    { name: "pancard_img_front", maxCount: 2 },
    { name: "pancard_img_back", maxCount: 2 },  
    { name: "passbook_img", maxCount: 2 },
  ]);

   
router.post("/app/vender_sendotp", vender_sendotp)

router.post("/app/vender_veryfyotp", vender_veryfyotp)

router.post("/app/vender_register/:id", vender_register)

router.post("/app/vender_register_img/:id", multipleUpload, vender_register_img)

router.get("/app/vender_getlist", vender_getlist)

router.get("/app/vender_getviewone/:id", vender_getviewone)

router.delete("/app/vender_deleteone/:id", vender_deleteone)

router.post("/app/vender_login", vender_login)




module.exports = router;