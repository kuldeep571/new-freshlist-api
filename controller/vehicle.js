const vehicle = require("../models/vehicle");
const cloudinary= require('cloudinary').v2;
const fs = require('fs');
require("dotenv").config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });



exports.addvehicle = async(req, res)=>{
    const{
        rc,
        insurance,
        license,
        driver_img,
    }=req.body;

    const newvehicle = new vehicle({
        rc:rc,
        insurance: insurance,
        license: license,
        driver_img: driver_img,
    })
  
    console.log('newvehicle', newvehicle);
    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path)  
        if(result){
            newvehicle.driver_img = result.secure_url;
            fs.unlinkSync(req.file.path);
        }
        newvehicle.save()
        .then((newvehicle)=>{
            res.status(200).json({
                status: true,
                msg: "success",
                data: newvehicle,
            })
        })
        .catch((error)=>{
            res.status(400).json({
                status: false,
                msg: "error",
                error: error,
            })
        })
    }
}


exports.getall_vehicle = async(req, res)=>{
    const findalldata = await vehicle.find().sort({sortorder:1})
    if(findalldata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findalldata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.viewone_vehicle = async(req, res)=>{
    const findexist = await vehicle.findOne({_id: req.params.id})
    if(findexist){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findexist,
        })
    }else{
        res.status(400).json({
            status:false,
            msg: "error", 
            error: error,
        })
    }
}


exports.del_vehicle = async(req, res)=>{
    const deleteone = await vehicle.deleteOne({_id: req.params.id})
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
            error: error,
        })
    }
}