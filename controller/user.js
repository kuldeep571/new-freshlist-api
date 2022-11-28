const User = require("../models/user");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const key = "verysecretkey";
//const nodemailer = require("nodemailer");
//const { sendmail } = require("./mail");


exports.websignup = async (req, res) => {
  let length = 6;
  let defaultotp = "123456";
  const {
    customerId,
    username,
    email,
    mobile,
    password,
    type,
    otp,
    cnfrmPassword,
    status,

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

  const newCustomer = new User({
    customerId: random_string,
    // added_by :req.sellerId,
    username: username,
    email: email,
    mobile: mobile,
    password: hashpassword,
    cnfrmPassword: hashpassword,
    type: type,
    status: status,
    otp: defaultotp
  });
  console.log("hhhh",newCustomer)

  let findexist= await User.findOne({mobile:req.body.mobile})
  if(findexist){
  res.json({
  status: "success",
  msg: "Welcome Back Otp send successfully",
  mobile:findexist.mobile,
  otp: defaultotp,
  _id: findexist?._id,
  status:findexist?.status
})
  } else {
    newCustomer
    .save()
    .then((data) => {
      res.json({
        status: "success",
        msg: "Otp send successfully",
        mobile: data?.mobile,
        _id: data?._id,
        otp:defaultotp
      })
    })
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  }
};

exports.sendotpuser = async (req, res) => {
  let length = 6;
  let defaultotp = "123456";
  const {mobile} =
    req.body;

  const newUser = new User({
    
    mobile: mobile,
   
     otp: defaultotp
  });
  const findexist = await User.findOne({
    $or: [{ mobile: mobile }],
  });
  if (findexist) {
    resp.alreadyr(res);
  } 
      newUser.save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "otp send successfully",
          data: data.mobile,
          otp:data.otp,
         _id: data?._id,

        })
      })
      .catch((error) => resp.errorr(res, error));
}

exports.veryfyotp =async(req, res)=>{
    const{mobile, otp}= req.body;
    const getuser= await User.findOne({mobile:mobile})
    if(getuser){  
      if(otp == 123456){
        const token = jwt.sign({
          userId: getuser._id,
        },
        key,
        {expiresIn: "365d"});
        await User.findOneAndUpdate(
          {
            _id:getuser._id,
          },
          {$set: {status:"true"}},
          {new: true}).then((data)=>{
            res.header("auth-token", token).status(200).send({
                status: true,
                msg: "otp verified",
                otp: otp,
                token:token,
                _id: getuser._id,
                mobile:getuser.mobile   
            })
          })
        }else{
          res.status(200).json({
            status:false,
            msg: "incurrect otp",
          })
        }
    }
} 


exports.login = async (req, res) => {
  const { mobile, email, password} = req.body;
  const user = await User.findOne({
    $or: [{ mobile: mobile }, { password: password }],
  });
  if (user?.status == true) {
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
        msg: "login success",
        user: user,
      });
    }
    } else if(user?.status == false){
        res.status(400).json({
          status: false,
          msg: "waiting for mobile verification",
          error:"error",
        });
    }

   else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  
};

}

