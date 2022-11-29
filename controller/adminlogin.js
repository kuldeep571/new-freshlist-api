const adminlogins = require("../models/adminlogin");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const key = "verysecretkey";
//const nodemailer = require("nodemailer");
//const { sendmail } = require("./mail");

exports.Addadmin = async (req, res)=>{
    const {
        customerId,
        username,
        email,
        mobile,
        image,
        password,
    } = req.body;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashpassword = bcrypt.hashSync(password, salt);

  create_random_string(6);
  function create_random_string(string_length) {
    (random_string = ""),
      (characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz");
    for (var i, i = 0; i < string_length; i++) {
      random_string += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return random_string;
  }

    const addadmin = new adminlogins({
        customerId: random_string,
        username: username,
        email: email,
        password:hashpassword,
        mobile: mobile,
        image: image
    })

  const findexist = await adminlogins.findOne({ email: email});
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    addadmin
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: addadmin
          ,
        })
      )
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  }
};


exports.adminlogin = async (req, res) => {
    const {email, password } = req.body;
    const user = await adminlogins.findOne({
      $or: [{ email: email }, { password: password }],
    });
    if (user) {
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        const token = jwt.sign(
          {
            userId: user._id,
          },
          process.env.TOKEN_SECRET,
          {
            expiresIn: 86400000,
          }
        );
        res.header("auth-token", token).status(200).send({
          status: true,
          token: token,
          msg: "success",
          user: user,
        });
      } else {
        res.status(400).json({
          status: false,
          msg: "Incorrect Password",
          error: "error",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        msg: "User Doesnot Exists",
        error: "error",
      });
    }
  };



