const assingdrive = require('../models/assing_drive');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


require("dotenv").config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.add_drive = async (req, res) => {
    const {

        firstname,
        lastname,
        identity_type,
        identity_no,
        phone_no,
        address,
        deliveryman_img,
        identity_img
    } = req.body;

    const newdrive = assingdrive({
        firstname: firstname,
        lastname: lastname,
        identity_type: identity_type,
        identity_no: identity_no,
        phone_no: phone_no,
        address: address,
        deliveryman_img: deliveryman_img,
        identity_img: identity_img
    })
    console.log("newdrive", newdrive);
    const findexist = await assingdrive.findOne({ identity_no: identity_no });
    if (findexist) {
        res.status(403).json({
            status: false,
            msg: "Allready exit",
            data: findexist,
        })
    } else {
        if (req.files.deliveryman_img[0].path) {
            image_array = [];
            for (let i = 0; i < req.files.deliveryman_img.length; i++) {
                const resp = await cloudinary.uploader.upload(
                    req.files.deliveryman_img[i].path,
                );
                fs.unlinkSync(req.files.deliveryman_img[i].path);
                image_array.push(resp.secure_url);
            }
            newdrive.deliveryman_img = image_array;
        }

        if (req.files.identity_img[0].path) {
            alluplaod = [];
            for (let i = 0; i < req.files.identity_img.length; i++) {
                const result = await cloudinary.uploader.upload(
                    req.files.identity_img[i].path,
                );
                fs.unlinkSync(req.files.identity_img[i].path);
                alluplaod.push(result.secure_url);
            }
            newdrive.identity_img = alluplaod;
        }

        newdrive.save()
            .then((newdrive) => {
                res.status(200).json({
                    status: true,
                    msg: "success",
                    data: newdrive,
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

exports.getall_drive = async(req, res)=>{
    const finddata = await assingdrive.find().sort({sortorder: 1})
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

exports.viewone_drive = async(req, res)=>{
    const findonedata = await assingdrive.findOne({_id: req.params.id});
    if(findonedata){
        res.status(200).json({
            status:true,
            msg: "success",
            data: findonedata,
        })
    }else{
        res.status(400).json({
            status:false,
            msg: "error",
            error: error,
        })
    }
}

exports.del_drive = async(req, res)=>{
    const deleteone = await assingdrive.deleteOne({_id: req.params.id});
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