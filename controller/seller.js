const sellers = require("../models/seller");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const key = "verysecretkey";
//const nodemailer = require("nodemailer");
//const { sendmail } = require("./mail");

function generateAccessToken(seller_name) {
    return jwt.sign(seller_name, process.env.TOKEN_SECRET, {
      expiresIn: "1800h",
    });
  }

exports.addseller= async (req, res)=>{
    const {firstname, lastname, email, password, cnfrmPassword, image, mobile, status, shop_name, shop_address }=req.body;

  

    const newsellerdata = sellers({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        mobile: mobile,
        image: image,
        status: status,
        shop_name: shop_name,
        shop_address: shop_address,
        cnfrmPassword: cnfrmPassword,
    });
    console.log("newsellerdata", newsellerdata)
    //return false 

    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path);
        newsellerdata.image = result.secure_url;
        fs.unlinkSync(req.file.path);
    }

    const findexist = await sellers.findOne({
        $or: [{email:email}, {password:password}],
    });
    if(findexist){
        res.status(400).json({
            status: false,
            msg: "Already Exists",
            data:{},
        });
        // console.log("newsellerdata", newsellerdata)
    }else{
        newsellerdata
        .save()
        .then((data)=>{
            const token = jwt.sign(
                {
                  sellerId: result._id,
                },
                process.env.TOKEN_SECRET,
                {
                  expiresIn: 86400000,
                }
              );
              res.header("auth-adtoken", token).status(200).json({
                status: true,
                token: token,
                msg: "success",
                user: result,
                //designation: "seller",
              });
        })
        .catch((error)=>{
            res.status(403).json({
                status: false,
                msg: 'error',
                error: error,
            })
        })
    }
}