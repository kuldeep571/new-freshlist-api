const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const { verifytoken } = require("../functions/verifytoken");
const { tokenverify } = require("../functions/tokenverify");

const {
  websignup,
  veryfyotp,
  login,
  edituser,
  userlist,
  dlt_user,
  user_true_false,
  getviewone,

  userVryfyotp,
  emailSend,
  sendotp,
  verifyotps,
  // adduser,
  userRegister,

  //adminuser form
  adduser,

} = require("../controller/user");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
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

// router.post("/user/websignup", websignup);
// router.post("/user/veryfyotp", veryfyotp);
router.post("/user/login", login);
router.get("/user/userlist", userlist);
router.post("/user/edituser/:id", edituser);
router.post("/user/user_true_false/:id", user_true_false);
router.delete("/user/dlt_user/:id", dlt_user);
router.get("/user/getviewone/:id", getviewone);
router.post("/user/sendotp", sendotp);
router.post("/user/verifyotps", verifyotps);
// router.post("/user/adduser", adduser);
router.post("/user/userRegister/:id", userRegister);

//adminuser

router.post("/admin/adduser", adduser);




module.exports = router;
 