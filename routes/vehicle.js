const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');


const{
    addvehicle,
    getall_vehicle,
    viewone_vehicle,
    del_vehicle,
    edit_vehicle,

}=require('../controller/vehicle');

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
    { name: "rc", maxCount: 1 },
    { name: "insurance", maxCount: 1 },
    { name: "license", maxCount: 1 },
    { name: "driver_img", maxCount: 1 },
  ]);




router.post("/admin/addvehicle", multipleUpload, addvehicle);

router.get("/admin/getall_vehicle", getall_vehicle);

router.get("/admin/viewone_vehicle/:id", viewone_vehicle);

router.delete("/admin/del_vehicle/:id", del_vehicle);

router.post("/admin/edit_vehicle/:id", multipleUpload, edit_vehicle);
 


module.exports = router;