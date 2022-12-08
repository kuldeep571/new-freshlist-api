const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    addseller,
    getallseller,
    viewone_seller,
    del_seller,
    edit_seller,
  
} = require("../controller/seller");


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

router.post("/admin/addseller",  uploads.single("image"), addseller);

router.get("/admin/getallseller", getallseller);

router.get("/admin/viewone_seller/:id", viewone_seller);

router.delete("/admin/del_seller/:id", del_seller);

router.post("/admin/edit_seller/:id",  uploads.single("image"), edit_seller);
module.exports = router;
 