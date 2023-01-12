const vehicle = require("../models/vehicle");
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require("dotenv").config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addvehicle = async (req, res) => {
    const {
        rc,
        insurance,
        license,
        driver_img,
    } = req.body;

    const newvehicle = new vehicle({
        rc: rc,
        insurance: insurance,
        license: license,
        driver_img: driver_img,
    })


    if (req.files.rc[0].path) {
        image_array = [];
        for (let i = 0; i < req.files.rc.length; i++) {
            const result = await cloudinary.uploader.upload(
                req.files.rc[i].path,
            );
            fs.unlinkSync(req.files.rc[i].path);
            image_array.push(result.secure_url);
        }
        newvehicle.rc = image_array;
    }
    if (req.files.insurance[0].path) {
        image_array = [];
        for (let i = 0; i < req.files.insurance.length; i++) {
            const result = await cloudinary.uploader.upload(
                req.files.insurance[i].path,
            );
            fs.unlinkSync(req.files.insurance[i].path);
            image_array.push(result.secure_url);
        }
        newvehicle.insurance = image_array;
    }
    if (req.files.license[0].path) {
        image_array = [];
        for (let i = 0; i < req.files.license.length; i++) {
            const result = await cloudinary.uploader.upload(
                req.files.license[i].path,
            );
            fs.unlinkSync(req.files.license[i].path);
            image_array.push(result.secure_url);
        }
        newvehicle.license = image_array;
    }
    if (req.files.driver_img[0].path) {
        image_array = [];
        for (let i = 0; i < req.files.driver_img.length; i++) {
            const result = await cloudinary.uploader.upload(
                req.files.driver_img[i].path,
            );
            fs.unlinkSync(req.files.driver_img[i].path);
            image_array.push(result.secure_url);
        }
        newvehicle.driver_img = image_array;
    }
    newvehicle.save()
        .then((newvehicle) => {
            res.status(200).json({
                status: true,
                msg: "success",
                data: newvehicle,
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


exports.getall_vehicle = async (req, res) => {
    const findalldata = await vehicle.find().sort({ sortorder: 1 })
    if (findalldata) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: findalldata,
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.viewone_vehicle = async (req, res) => {
    const findexist = await vehicle.findOne({ _id: req.params.id })
    if (findexist) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: findexist,
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}


exports.del_vehicle = async (req, res) => {
    const deleteone = await vehicle.deleteOne({ _id: req.params.id })
    if (deleteone) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: deleteone,
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}


exports.edit_vehicle = async(req, res)=>{
    const{
        rc,
        insurance,
        license,
        driver_img,
    }=req.body;

    data={};
    if(rc){
        data.rc = rc;
    }
    if(insurance){
        data.insurance = insurance;
    }
    if(license){
        data.license = license;
    }
    if(driver_img){
        data.driver_img = driver_img;
    }

    if(req.files){
        if(req.files.rc){
            alluploads = [];
            for(let i=0; i< req.files.rc.length; i++){
                const result = await cloudinary.uploader.upload(
                    req.files.rc[i].path,
                    { use_filename: true, unique_filename: false }
                )
                fs.unlinkSync(req.files.rc[i].path);
                alluploads.push(result.secure_url);
            }
            data.rc = alluploads;
        }
        if (req.files.insurance) {
            alluploads = [];
            for (let i = 0; i < req.files.insurance.length; i++) {
                const result = await cloudinary.uploader.upload(
                    req.files.insurance[i].path,
                    { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.insurance[i].path);
                alluploads.push(result.secure_url);
            }
            data.insurance = alluploads;
        }
        if(req.files.license){
            alluploads = [];
            for(let i=0; i< req.files.license; i++){
                const result = await cloudinary.uploader.upload(
                    req.files.license[i].path,
                    { use_filename: true, unique_filename: false}
                );
                fs.unlinkSync(req.files.license)
                alluploads.push(result.secure_url);
            }
            data.license = alluploads;
        }

        if(req.files.driver_img){
            alluploads = [];
            for(let i=0; i< req.files.driver_img; i++){
                const result = await cloudinary.uploader.upload(
                    req.files.driver_img[i].path,
                    { user_filename: true, unique_filename: false}
                );
                fs.unlinkSync(req.files.driver_img)
                alluploads.push(result.secure_url);
            }
            data.license = alluploads;
        }
    }
    if(data){
        const updatedata = await vehicle.findOneAndUpdate(
            {_id: req.params.id},
            {$set: data},
            {new: true},
        )
        if(updatedata){
            res.status(200).json({
                status: true,
                msg: "success",
                data: updatedata
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


