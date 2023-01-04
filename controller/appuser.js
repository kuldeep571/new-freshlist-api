const appvender = require('../models/appuser');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

require("dotenv").config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const key = "verysecretkey";


exports.vender_sendotp = async (req, res) => {
    let length = 6;
    let defaultotp = "123456";

    const { name,
        mobile,
    } = req.body;
    const newappuser = new appvender({
        name: name,
        mobile: mobile,
        otp: defaultotp
    });

    const findexist = await appvender.findOne({ mobile: mobile });
    if (findexist) {
        res.status(403).json({
            status: false,
            msg: "welcome back",
            data: findexist,
        })
    } else {

        newappuser.save()
            .then((data) => {
                res.status(200).json({
                    status: true,
                    msg: "otp send successfully",
                    mobile: data.mobile,
                    name: data.name,
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

}


exports.vender_veryfyotp = async (req, res) => {
    let length = 6;
    let defaultotp = "123456";
    const {
        mobile,
        otp,
    } = req.body;
    if (otp == 123456) {
        const findone = await appvender.findOne({ mobile: mobile });
        if (findone) {
            res.status(200).json({
                status: true,
                msg: "otp veryfied please register",
                mobile: mobile,
                otp: defaultotp,
                _id: findone._id
            });
        }
    } else {
        res.status(400).json({
            status: false,
            mag: "incurrect otp",
        });
    }
}

exports.vender_register = async (req, res) => {
    const venderdata = await appvender.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true },
    )
    if (venderdata) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: venderdata,
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }


}

exports.vender_register_img = async (req, res) => {
    const {
        vendoor_img,
        adhar_no,
        adhar_img,
        pancard_no,
        pancard_img,
        account_no,
        cus_name,
        branch,
        ifsc_code,
        passbook_img,

    } = req.body
    data = {};

    if (vendoor_img) {
        data.vendoor_img = vendoor_img;
    }
    if (adhar_no) {
        data.adhar_no = adhar_no;
    }
    if (adhar_img) {
        data.adhar_img = adhar_img;
    }
    if (pancard_no) {
        data.pancard_no = pancard_no;
    }
    if (pancard_img) {
        data.pancard_img = pancard_img;
    }
    if (account_no) {
        data.account_no = account_no;
    }
    if (cus_name) {
        data.cus_name = cus_name;
    }
    if (branch) {
        data.branch = branch;
    }
    if (ifsc_code) {
        data.ifsc_code = ifsc_code;
    }
    if (passbook_img) {
        data.passbook_img = passbook_img;
    }

    if (req.files) {
        if (req.files.vendoor_img) {
            alluploads = [];
            for (let i = 0; i < req.files.vendoor_img.length; i++) {
                const result = await cloudinary.uploader.upload(
                    req.files.vendoor_img[i].path,
                    { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.vendoor_img[i].path);
                alluploads.push(result.secure_url);
            }
            data.vendoor_img = alluploads;
        }

        if (req.files.adhar_img) {
            alluploads = [];
            for (let i = 0; i < req.files.adhar_img.length; i++) {
                const result = await cloudinary.uploader.upload(
                    req.files.adhar_img[i].path,
                    { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.adhar_img[i].path);
                alluploads.push(result.secure_url);
            }
            data.adhar_img = alluploads;
        }

        if (req.files.pancard_img) {
            alluploads = [];
            for (let i = 0; i < req.files.pancard_img.length; i++) {
                const result = await cloudinary.uploader.upload(
                    req.files.pancard_img[i].path,
                    { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.pancard_img[i].path);
                alluploads.push(result.secure_url);
            }
            data.pancard_img = alluploads;
        }

        if(req.files.passbook_img){
            alluploads = [];
            for(let i=0; i< req.files.passbook_img.length; i++){
                const result = await cloudinary.uploader.upload(
                    req.files.passbook_img[i].path,
                    {use_filename: true, unique_filename: false}
                );
                fs.unlinkSync(req.files.passbook_img[i].path);
                alluploads.push(result.secure_url);
            }
            data.passbook_img = alluploads;
        }
    }
    if (data) {
        const updatedata = await appvender.findOneAndUpdate(
            { _id: req.params.id },
            { $set: data, status: "true" },
            { new: true }
        )
        if (updatedata) {
            res.status(200).json({
                status: true,
                msg: "success",
                data: updatedata,
            })
        } else {
            res.status(400).json({
                status: false,
                msg: "error",
                error: "error",
            })
        }
    }
}


exports.vender_getlist = async(req, res)=>{
    const finddata = await appvender.find().sort({sortorder: 1})
    if(finddata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: finddata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.vender_getviewone = async(req, res)=>{
    const findviewone = await appvender.findOne({_id: req.params.id})
    if(findviewone){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findviewone,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.vender_deleteone = async(req, res)=>{
    const deleteone = await appvender.deleteOne({_id: req.params.id})
    if(deleteone){
        res.status(200).json({
            status: true,
            msg: "success",
            data: deleteone,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}