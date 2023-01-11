const User = require("../models/user");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require("../models/user");
const saltRounds = 10;
const key = "verysecretkey";
//const nodemailer = require("nodemailer");
//const { sendmail } = require("./mail");



// exports.websignup = async (req, res) => {
//   let length = 6;
//   let defaultotp = "123456";
//   const {
//     customerId,
//     username,
//     email,
//     mobile,
//     password,
//     type,
//     otp,
//     cnfrmPassword,
//     status,

//     alt_mobile,
//     alt_email,
//     group,
//     latitude,
//     longitude,
//     name,
//     city,
//     door_number

//   } = req.body;

//   const salt = bcrypt.genSaltSync(saltRounds);
//   const hashpassword = bcrypt.hashSync(password, salt);

//   create_random_string(6);
//   function create_random_string(string_length) {
//     (random_string = ""),
//       (characters =
//         "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz");
//     for (var i, i = 0; i < string_length; i++) {
//       random_string += characters.charAt(
//         Math.floor(Math.random() * characters.length)
//       );
//     }
//     return random_string;
//   }

//   if (password == cnfrmPassword) {

//     const newCustomer = new User({
//       customerId: random_string,
//       username: username,
//       email: email,
//       mobile: mobile,
//       password: hashpassword,
//       cnfrmPassword: hashpassword,
//       type: type,
//       status: status,
//       otp: defaultotp,
//       alt_mobile: alt_mobile,
//       alt_email: alt_email,
//       group: group,
//       latitude: latitude,
//       longitude: longitude,
//       name: name,
//       city: city,
//       door_number: door_number,
//     });
//     let findexist = await User.findOne({ mobile: req.body.mobile })
//     if (findexist) {
//       res.json({
//         status: "success",
//         msg: "Welcome Back Otp send successfully",
//         mobile: findexist.mobile,
//         otp: defaultotp,
//         _id: findexist?._id,
//         status: findexist?.status
//       })
//     } else {
//       newCustomer
//         .save()

//         .then((data) => {
//           res.json({
//             status: "success",
//             msg: "Otp send successfully",
//             mobile: data?.mobile,
//             _id: data?._id,
//             otp: defaultotp
//           })
//         })
//         .catch((error) => {
//           res.status(400).json({
//             status: false,
//             msg: "error",
//             error: error,
//           });
//         });
//     }
//   } else {
//     res.status(403).json({
//       status: false,
//       msg: "password is not match",
//     })
//   }
//   // console.log("newcustomer data",newCustomer)
// };

// exports.sendotpuser = async (req, res) => {
//   let length = 6;
//   let defaultotp = "123456";
//   const {mobile} =
//     req.body;

//   const newUser = new User({

//     mobile: mobile,

//      otp: defaultotp
//   });
//   const findexist = await User.findOne({
//     $or: [{ mobile: mobile }],
//   });
//   if (findexist) {
//     resp.alreadyr(res);
//   } 
//       newUser.save()
//       .then((data) => {
//         res.status(200).json({
//           status: true,
//           msg: "otp send successfully",
//           data: data.mobile,
//           otp:data.otp,
//          _id: data?._id,

//         })
//       })
//       .catch((error) => resp.errorr(res, error));
// }

// exports.veryfyotp = async (req, res) => {
//   let length = 6;
//   let defaultotp = "123456";
//   const { mobile, otp } = req.body;
//   const getuser = await User.findOne({ mobile: mobile })
//   if (getuser) {
//     if (otp == 123456) {
//       const token = jwt.sign({
//         userId: getuser._id,
//       },
//         key,
//         { expiresIn: "365d" });
//       await User.findOneAndUpdate(
//         {
//           _id: getuser._id,
//         },
//         { $set: { status: "true" } },
//         { new: true }).then((data) => {
//           res.header("auth-token", token).status(200).send({
//             status: true,
//             msg: "otp verified",
//             otp: otp,
//             token: token,
//             _id: getuser._id,
//             mobile: getuser.mobile
//           })
//         })
//     } else {
//       res.status(200).json({
//         status: false,
//         msg: "incurrect otp",
//       })
//     }
//   }
// }


// exports.login = async (req, res) => {
//   const { mobile, email, password } = req.body;
//   const user = await User.findOne({
//     $or: [{ mobile: mobile }, { password: password }],
//   });
//   if (user?.status == "true") {
//     const validPass = await bcrypt.compare(password, user.password);
//     if (validPass) {
//       const token = jwt.sign(
//         {
//           userId: user._id,
//         },
//         process.env.TOKEN_SECRET,
//         {
//           expiresIn: 86400000,
//         }
//       );
//       res.header("auth-token", token).status(200).send({
//         status: true,
//         token: token,
//         msg: "login success",
//         user: user,
//       });
//     }
//   } else if (user?.status == "false") {
//     res.status(400).json({
//       status: false,
//       msg: "waiting for mobile verification",
//       error: "error",
//     });
//   }

//   else {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: "error",
//     });

//   };
// }

exports.userlist = async (req, res) => {
  const findall = await User.find().sort({
    sortorder: 1,
  });
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    })
  } else {
    res.status(403).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.edituser = async (req, res) => {
  const{
    username,
    email,
    mobile,
    image,
  }=req.body;

  data={};
  if(username){
    data.username= username;
  }
  if(email){
    data.email = email;
  }
  if(mobile){
    data.mobile = mobile;
  }
  if(image){
    data.image = image;
  }
  if(req.file){
    const result = await cloudinary.uploader.upload(req.file.path);
    data.image =  result.secure_url;
    fs.unlinkSync(req.file.path);
}
  if(data){
    const updatebrand= await User.findOneAndUpdate(
        {_id: req.params.id},
        {$set: data},
        {new: true}
    );
    if(updatebrand){
        res.status(200).json({
            status:true,
            msg: "success",
            data:updatebrand,
        })
    }else{
        res.status(400).json({
            status:false,
            msg:"error",
            error: "error"
        });
    }
  }
}

exports.dlt_user = async (req, res) => {
  try {
    const deleteuser = await User.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: true,
      msg: "success",
      data: deleteuser,
    });
  } catch (error) {
    res.status(403).json({
      stauts: false,
      msg: "error",
      error: error,
    });
  }
};

exports.user_true_false = async (req, res) => {
  const { status } = req.body
  const findupdate = await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { status: status } },
    { new: true }
  );
  if (findupdate) {
    res.status(200).json({
      status: true,
      msg: "success",
      status: findupdate.status,
    })
  } else {
    res.status(403).json({
      status: false,
      msg: "error",
      error: error,
    })
  }

}

exports.getviewone = async (req, res) => {
  try {
    const findone = await User.findOne({ _id: req.params.id });
    if (findone) {
      res.status(200).json({
        status: true,
        msg: "success",
        data: findone,
      })
    }
    else {
      res.status(403).json({
        status: false,
        msg: "error",
        error: "error",
      })
    }
  } catch (error) {
    console.log(error);
  }
}

exports.sendotp = async (req, res) => {
  let length = 6;
  let defaultotp = "123456";

  const { mobile } = req.body;
  const newUser = new User({
    mobile: mobile,
    otp: defaultotp
  });

  const findexist = await User.findOne({ mobile: mobile });
  if (findexist) {
    res.status(403).json({
      status: false,
      msg: "welcome back",
      data: findexist,
    })
  }
  newUser.save()
    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "otp send successfully",
        data: data.mobile,
        otp: data.otp,
        _id: data?._id,
      })
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "unsend otp",
        error: error,
      })
    })
}

exports.verifyotps = async (req, res) => {
  let length = 6;
  let defaultotp = "123456";
  const { mobile, otp } = req.body;
  if (otp == 123456) {
    const findone = await User.findOne({ mobile: mobile });
    if (findone) {
      res.status(200).json({
        status: true,
        msg: "otp verified please register",
        mobile: mobile,
        otp: defaultotp,
        _id: findone._id
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "Incorrect Otp",
    });
  }
}

exports.userRegister = async (req, res) => {
  const { status, password } = req.body
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashpassword = bcrypt.hashSync(password, salt);


  const userdetail = await User.findOneAndUpdate(
    {
      _id: req.params.id
    },
    { $set: req.body, status: "true", password: hashpassword, cnfrmPassword: hashpassword },
    { new: true }
  )
  if (userdetail) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: userdetail,
    })
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    })
  }
}

// exports.adduser = async (req, res) => {
//   const {
//     customerId,
//     username,
//     email,
//     mobile,
//     password,
//     type,
//     cnfrmPassword,
//     status,
//     alt_mobile,
//     alt_email,
//     group,
//     latitude,
//     longitude,
//     name,
//     city,
//     door_number

//   } = req.body;

//   const salt = bcrypt.genSaltSync(saltRounds);
//     const hashpassword = bcrypt.hashSync(password, salt);

//     create_random_string(6);
//     function create_random_string(string_length) {
//       (random_string = ""),
//         (characters =
//           "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz");
//       for (var i, i = 0; i < string_length; i++) {
//         random_string += characters.charAt(
//           Math.floor(Math.random() * characters.length)
//         );
//       }
//       return random_string;
//     }

//   const newUser = new User({
//     customerId: random_string,
//     username: username,
//     email: email,
//     mobile: mobile,
//     password: hashpassword,
//     cnfrmPassword: hashpassword,
//     type: type,
//     // status: status,
//     alt_mobile: alt_mobile,
//     alt_email: alt_email,
//     group: group,
//     latitude: latitude,
//     longitude: longitude,
//     name: name,
//     city: city,
//     door_number: door_number,
//   });
//   console.log("newUser", newUser)
//   // return false

//   const findexist = await User.findOne({ email: email });
//   if (findexist) {
//     res.status(400).json({
//       status: false,
//       msg: "Already Exists",
//       data: {},
//     });
//   }
//   else {
//     newUser
//       .save()
//       .then((data) => {
//         res.status(200).json({
//           status: true,
//           msg: "success",
//           data: data,
//         });
//       })
//       .catch((error) => {
//         res.status(400).json({
//           status: false,
//           msg: "error",
//           error: error,
//         });
//       });
//   }
// }

// exports.login = async (req, res) => {
//   const { mobile, email, password } = req.body;
//   const user = await User.findOne({
//     $or: [{ mobile: mobile }, { password: password }],
//   });
//   console.log("data", user)
//   if (user?.status == "true") {
//     const validPass = await bcrypt.compare(password, user.password);
//     // console.log("data", validPass);
//     if (validPass) {
//       const token = jwt.sign(
//         {
//           userId: user._id,
//         },
//         process.env.TOKEN_SECRET,
//         {
//           expiresIn: 86400000,
//         }
//       );
//       res.status(200).json({
//         status: true,
//         token: token,
//         msg: "login success",
//         user: user,
//       });
//     } else {
//       res.status(400).json({
//         status: false,
//         msg: "password is incorrect ",
//         error: "error",
//       })
//     }
//   } else if (user?.status == "false") {
//     res.status(201).json({
//       status: false,
//       msg: "waiting for mobile verification",
//       error: "error",
//     });
//   }
//   else {
//     res.status(401).json({
//       status: false,
//       msg: "Email and password is incorrect",
//       error: "error",
//     });
//   };
// }

// exports.login = async (req,res) =>{
//   let length = 6;
//   let defaultotp = "123456";
//   const getuser = await User.findOne({ mobile: req.body.mobile });
//   if (getuser?.approvedstatus == "true") {
//     console.log("STRING",getuser)
//     res.status(200).send({
//       status: true,
//       msg: "otp Send Successfully",
//       //otp: otp,
//       _id: getuser._id,
//       mobile:getuser.mobile
//     })
//    } else if(getuser?.approvedstatus == "false") {
//     res.status(200).json({
//       status: true,
//       msg: "Waiting for Admin Approval",
//     });
//   }else{
//     res.status(400).json({
//       status : false,
//       msg :"User doesn't Exist"
//     })
//   }
// };

exports.login = async (req, res) => {
  const {  email, password,mobile } = req.body;
  const user = await User.findOne( {   
    $or: [{ mobile: mobile }, { password: password }],
  //   $and: [

  //     { $or: [{ password: password }, { mobile: mobile }] }
    

   });
  console.log("user", user);
  if (user.status == "true") {
      
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      res.status(200).send({
        status: true,
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
      msg: "User Doesnot Exist",
      error: "error",
    });
  }
};


exports.totaluser = async(req, res)=>{
  await User.countDocuments()
  .then((data)=>{
    res.status(200).json({
      status: true,
      data: data
    })
  })
  .catch((error)=>{
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    })
  })
}

exports.resetPassword = async (req, res) => {
  const { oldpassword ,password, cnfrmPassword } = req.body
  const userData = await User.findOne({_id : req.params.id})
  if(userData){
  const passwordMatch = await bcrypt.compare(oldpassword,userData.password)
  if(passwordMatch){
    // console.log("matched")
    if(password === cnfrmPassword){
      const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const findandUpdateEntry = await User.findOneAndUpdate(
          {
            _id: req.params.id
          },
          { $set: { password: hashPassword, cnfrmPassword: hashPassword } },
          { new: true }
        );
        if (findandUpdateEntry) {
          res.status(200).json({
            status: true,
            msg: "success",
            data: findandUpdateEntry,
          });
        } 
    }else {
      res.status(401).json({
        status: false,
        msg: "Password confirm password not matched"
        
      });
    }
  }else{
    res.status(400).json({
          status: false,
          msg: "Old Password not matched",
         
        })
      }
  
  }
};

exports.adduser = async (req, res) => {
  const {
    username,
    email,
    mobile,
    password,
    cnfrmPassword,
    status,
  } = req.body;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashpassword = bcrypt.hashSync(password, salt);


  if (password == cnfrmPassword) {
    const newadduser = new user({
      username: username,
      email: email,
      mobile: mobile,
      password: hashpassword,
      cnfrmPassword: hashpassword,
      status: "true",
    })

    const findexist = await user.findOne({ email: email})
    if (findexist) {
      res.status(403).json({
        status: false,
        msg: "Allready exist",
        data: {},
      })
    }
    newadduser.save()
      .then((newadduser) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: newadduser,
        })
      })
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        })
      })
  }else{
      res.status(403).json({
        status: false,
        msg: "password and cnfrmpassword is not match",
        error: "error",
      })
  }
}


