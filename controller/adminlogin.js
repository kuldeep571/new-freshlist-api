const adminlogins = require("../models/adminlogin");
const cloudinary = require("cloudinary").v2;
const fs = require('fs');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const key = "verysecretkey";
// const nodemailer = require("nodemailer");
// const { sendmail } = require("./mail");

const validatePassword = (password, dbpassword) => {
  bcrypt.compareSync(password, dbpassword);
  return true;
};


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.Addadmin = async (req, res) => {
  const {
    customerId,
    username,
    email,
    password,
    mobile,
    country,
    state,
    city,
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
    password: hashpassword,
    mobile: mobile,
    country: country,
    state: state,
    city: city,
  })

  const findexist = await adminlogins.findOne({ email: email });
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
          data: addadmin,
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
  const { email, password } = req.body;
  const user = await adminlogins.findOne({
    $or: [{ email: email }, {password: password }],
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
}

exports.getoneadmin = async (req, res) => {
  const findOne = await adminlogins.findOne({ _id: req.params.id });
  if (findOne) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findOne,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
}

exports.adminprofile = async (req, res) => {

  const {
    username,
    email,
    mobile,
    country,
    state,
    city,
    image,
    // password,
  } = req.body;

  data = {};
  if (username) {
    data.username = username;
  }
  if (email) {
    data.email = email;
  }
  if (mobile) {
    data.mobile = mobile;
  }
  if (country) {
    data.country = country;
  }
  if (state) {
    data.state = state;
  }
  if (city) {
    data.city = city;
  }
  if (image) {
    data.image = image;
  }
  // if (password) {
  //   data.password = password;
  // }

  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    data.image = response.secure_url;
    fs.unlinkSync(req.file.path);
  }
  // if (req.files) {
  //   if (req.files.image[0].path) {
  //     alluploads = [];
  //     for (let i = 0; i < req.files.image.length; i++) {
  //       const resp = await cloudinary.uploader.upload(
  //         req.files.image[i].path,
  //         { use_filename: true, unique_filename: false }
  //       );
  //       fs.unlinkSync(req.files.image[i].path);
  //       alluploads.push(resp.secure_url);
  //     }
  //     data.image = alluploads;
  //   }
  // }
  if (data) {
    const findandUpdateEntry = await adminlogins.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: data },
      { new: true }
    );
    if (findandUpdateEntry) {
      res.status(200).json({
        status: true,
        msg: "success",
        data: findandUpdateEntry,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "error",
      });
    }
  }
}

