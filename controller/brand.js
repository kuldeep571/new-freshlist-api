const brands = require('../models/brand');
const cloudinary= require('cloudinary').v2;
const fs = require('fs');
require("dotenv").config();

exports.addbrand= async (req, res)=>{
    const{
        brand_name,
        desc,
        image,
        status,
    }=req.body;

    const newbrand = new brands({
        brand_name: brand_name, 
        desc: desc,
        image: image,
        status:status,
    })
    // console.log('newbrand', newbrand);
    const findexist = await brands.findOne({brand_name: brand_name});
    if(findexist){
        res.status(403).json({
            status:true,
            msg:"Allready exist",
            data: {},
        })
    } else{
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            if(result){
                newbrand.image = result.secure_url;
                fs.unlinkSync(req.file.path);
            }
            newbrand
            .save()
            .then((data)=>{
                res.status(200).json({
                    status:true,
                    msg: "success",
                    data: data,
                })
            })
            .catch((error)=>{
                res.status(403).json({
                    status:false,
                    msg: "error",
                    error: "error",
                })
            })
        }
    }
}