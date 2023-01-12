const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

// const { verifytoken } = require("../functions/verifytoken");
// const { tokenverify } = require("../functions/tokenverify");

const {
    add_banner,
    getall_banner,
    viewone_banner,
    del_banner,
    getbannerbytype,
    
} = require("../controller/banner");

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
  { name: "banner_img", maxCount: 1 },
]);


router.post("/admin/add_banner", multipleUpload, add_banner);

router.get("/admin/getall_banner", getall_banner);

router.get("/admin/viewone_banner/:id", viewone_banner);

router.get("/admin/getbannerbytype/:banner_type", getbannerbytype);

router.delete("/admin/del_banner/:id", del_banner);

module.exports = router;
 