const vendor = require('../models/vendor');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


require("dotenv").config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const validatePassword = (password, dbpassword) => {
    bcrypt.compareSync(password, dbpassword);
    return true;
};

exports.add_vendor = async (req, res) => {
    const {
        firstname,
        lastname,
        phone,
        vendor_img,
        email,
        password,
        confirmpassword,
        shop_name,
        shop_address,
        shop_logo,
        shop_banner,
        status,
    } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashpassword = bcrypt.hashSync(password, salt);

    const newvendor = new vendor({
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        vendor_img: vendor_img,
        email: email,
        password: hashpassword,
        confirmpassword: hashpassword,
        shop_name: shop_name,
        shop_address: shop_address,
        shop_logo: shop_logo,
        shop_banner: shop_banner,
        status: status,
    })

    const findexist = await vendor.findOne({ email: email });
    if (findexist) {
        res.status(403).json({
            status: false,
            msg: "Allready exist",
            data: {},
        })
    } else {
        if (req.files.vendor_img[0].path) {
            image_array = [];
            for (let i = 0; i < req.files.vendor_img.length; i++) {
                const result = await cloudinary.uploader.upload(
                    req.files.vendor_img[i].path,
                );
                fs.unlinkSync(req.files.vendor_img[i].path);
                image_array.push(result.secure_url);
            }
            newvendor.vendor_img = image_array;
        }
        if (req.files.shop_logo[0].path) {
            image_array = [];
            for (let i = 0; i < req.files.shop_logo.length; i++) {
                const result = await cloudinary.uploader.upload(
                    req.files.shop_logo[i].path,
                );
                fs.unlinkSync(req.files.shop_logo[i].path);
                image_array.push(result.secure_url);
            }
            newvendor.shop_logo = image_array;
        }
        if (req.files.shop_banner[0].path) {
            image_array = [];
            for (let i = 0; i < req.files.shop_banner.length; i++) {
                const result = await cloudinary.uploader.upload(
                    req.files.shop_banner[i].path,
                );
                fs.unlinkSync(req.files.shop_banner[i].path);
                image_array.push(result.secure_url);
            }
            newvendor.shop_banner = image_array;
        }
        newvendor.save()
            .then((newvendor) => {
                res.status(200).json({
                    status: true,
                    msg: "success",
                    data: newvendor,
                })
            })
            .catch((error) => {
                res.status(400).json({
                    status: false,
                    msg: "error",
                    error: error,
                })
            })
    }
}

exports.getall_vendor = async (req, res) => {
    try {
        const findalldata = await vendor.find().sort({ sortorder: 1 });
        res.status(200).json({
            status: true,
            msg: "success",
            data: findalldata,
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }

}

exports.viewone_vendor = async (req, res) => {
    try {
        const findonedata = await vendor.findOne({ _id: req.params.id })
        res.status(200).json({
            status: true,
            msg: "success",
            data: findonedata,
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

exports.del_vendor = async (req, res) => {
    try {
        const deleteone = await vendor.deleteOne({ _id: req.params.id });
        res.status(200).json({
            status: true,
            msg: "success",
            data: deleteone,
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

// exports.edit_vendor = async (req, res) => {

//     const {
//         firstname,
//         lastname,
//         phone,
//         vendor_img,
//         shop_name,
//         shop_address,
//         shop_logo,
//         shop_banner
//     } = req.body;

//     data = {};
//     if (firstname) {
//         data.firstname = firstname;
//     }
//     if (lastname) {
//         data.lastname = lastname;
//     }
//     if (phone) {
//         data.phone = phone;
//     }
//     if(vendor_img){
//         data.vendor_img = vendor_img;
//     }
//     if (shop_name) {
//         data.shop_name = shop_name;
//     }
//     if (shop_address) {
//         data.shop_address = shop_address;
//     }
//     if (shop_logo) {
//         data.shop_logo = shop_logo;
//     }
//     if (shop_banner) {
//         data.shop_banner = shop_banner;
//     }

//     if (req.files) {
//         if (req.files.vendor_img) {
//             alluploads = [];
//             for (let i = 0; i < req.files.vendor_img.length; i++) {
//                 const result = await cloudinary.uploader.upload(
//                     req.files.vendor_img[i].path,
//                     { use_filename: true, unique_filename: false }
//                 );
//                 fs.unlinkSync(req.files.vendor_img[i].path);
//                 alluploads.push(result.secure_url);
//             }
//             data.vendor_img = alluploads;
//         }
//         if (req.files.shop_logo) {
//             alluploads = [];
//             for (let i = 0; i < req.files.shop_logo.length; i++) {
//                 const result = await cloudinary.uploader.upload(
//                     req.files.shop_logo[i].path,
//                     { use_filename: true, unique_filename: false }
//                 );
//                 fs.unlinkSync(req.files.shop_logo[i].path);
//                 alluploads.push(result.secure_url);
//             }
//             data.shop_logo = alluploads;
//         }
//         if (req.files.shop_banner) {
//             alluploads = [];
//             for (let i = 0; i < req.files.shop_banner.length; i++) {
//                 const result = await cloudinary.uploader.upload(
//                     req.files.shop_banner[i].path,
//                     { use_filename: true, unique_filename: false }
//                 );
//                 fs.unlinkSync(req.files.shop_banner[i].path);
//                 alluploads.push(result.secure_url);
//             }
//             data.shop_banner = alluploads;
//         }
//     }
//     if (data) {
//         const updatedata = await vendor.findOneAndUpdate(
//             { _id: req.params.id },
//             { $set: data },
//             { new: true },
//             )
//             console.log("updatedata", data);
//         // return false;
//         // .then((updatedata)=>{
//         //     res.status(200).json({
//         //         status: true,
//         //         msg: "success",
//         //         data: updatedata,
//         //     })
//         // })
//         // .catch((error)=>{
//         //     res.status(400).json({
//         //         status: false,
//         //         msg: "error",
//         //         error: error,
//         //     })
//         // })
//     }
// }

exports.edit_vendor = async(req, res)=>{
    const{
        firstname,
        lastname,
        phone,
        vendor_img,
        shop_name,
        shop_address,
        shop_logo,
        shop_banner
    }=req.body;

    data={};
    if(firstname){
        data.firstname = firstname;
    }
    if(lastname){
        data.lastname = lastname;
    }
    if(phone){
        data.phone = phone;
    }
    if(vendor_img){
        data.vendor_img = vendor_img;
    }
    if(shop_name){
        data.shop_name = shop_name;
    }
    if(shop_address){
        data.shop_address = shop_address;
    }
    if(shop_logo){
        data.shop_logo = shop_logo;
    }
    if(shop_banner){
        data.shop_banner = shop_banner;
    }

    // multipal image update
   
    if(req.files){
       if(req.files.vendor_img){
        alluploads = [];
        for(let i = 0; i< req.files.vendor_img.length; i++){
            const result = await cloudinary.uploader.upload(
                req.files.vendor_img[i].path,
                {use_filename: true, unique_filename: false}
            );
            fs.unlinkSync(req.files.vendor_img[i].path);
            alluploads.push(result.secure_url); 
        }
        data.vendor_img = alluploads;
       }

       if(req.files.shop_logo){
        alluploads = [];
        for(let i=0; i< req.files.shop_logo.length; i++){
            const result = await cloudinary.uploader.upload(
                req.files.shop_logo[i].path,
                {use_filename: true, unique_filename: false}
            );
            fs.unlinkSync(req.files.shop_logo[i].path);
            alluploads.push(result.secure_url);
        }
        data.shop_logo = alluploads;
       }

       if(req.files.shop_banner){
        alluploads = [];
        for(let i=0; i< req.files.shop_banner.length; i++){
            const result = await cloudinary.uploader.upload(
                req.files.shop_banner[i].path,
                {use_filename: true, unique_filename: false}
            );
            fs.unlinkSync(req.files.shop_banner[i].path);
            alluploads.push(result.secure_url);
        }
        data.shop_banner = alluploads;
       }
    }
    if(data){
        const updatedata = await vendor.findOneAndUpdate(
            {_id: req.params.id},
            {$set: data},
            {new: true}
        )
        if(updatedata){
            res.status(200).json({
                status: true,
                msg: "success",
                data: updatedata,
            })
        }else{
            res.status(400).json({
                status: false,
                msg: "error",
                error: "error",
            })
        }
    }
}