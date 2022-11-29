const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

// const { verifytoken } = require("../functions/verifytoken");
// const { tokenverify } = require("../functions/tokenverify");

const {
    Addadmin,
    adminlogin,
  login,
  editprofile,
  sendotp,
  userVryfyotp,
  emailSend,
  verifyotp,
} = require("../controller/adminlogin");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //console.log(file);
    let path = `./uploadesimages`;
    if (!fs.existsSync("uploadesimages")) {
      fs.mkdirSync("uploadesimages");
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

router.post("/admin/Addadmin", Addadmin);
router.post("/admin/adminlogin", adminlogin);
// router.post("/user/veryfyotp", veryfyotp);
// router.post("/user/login", login);
// router.post("/user/editprofile", editprofile);
// // router.post("/user/sendotp", sendotp);


module.exports = router;
 