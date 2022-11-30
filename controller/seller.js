const sellers = require("../models/seller");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const key = "verysecretkey";
//const nodemailer = require("nodemailer");
//const { sendmail } = require("./mail");

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
        })
    }else{
        newsellerdata
        console.log("newsellerdata", newsellerdata)
        .save()
    }
    // console.log("newsellerdata", newsellerdata);
}