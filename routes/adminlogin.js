const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

// const { verifytoken } = require("../functions/verifytoken");
// const { tokenverify } = require("../functions/tokenverify");

const {
    Addadmin,
    adminlogin,
    adminprofile,
    getoneadmin,
} = require("../controller/adminlogin");

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
// ]);


router.post("/admin/Addadmin", Addadmin);
router.post("/admin/adminlogin", adminlogin);
router.get("/admin/getoneadmin/:id", getoneadmin);
router.post("/admin/adminprofile/:id",uploads.single("image"), adminprofile);


module.exports = router;
 