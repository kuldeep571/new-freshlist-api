const brands = require('../models/brand');
const cloudinary= require('cloudinary').v2;
const fs = require('fs');
require("dotenv").config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


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
    // const findexist = await brands.findOne({brand_name: brand_name});
    // if(findexist){
    //     res.status(403).json({
    //         status:true,
    //         msg:"Allready exist",
    //         data: {},
    //     })
    // } else{
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
                res.status(400).json({
                    status:false,
                    msg: "error",
                    error: error,
                })
            })
        }
    }
// }

exports.brandlist= async (req, res)=>{
    const findall = await brands.find().sort({sortorder:1})
    if(findall){
        res.status(200).json({
            status:true,
            msg:"success",
            data:findall,
        })
    }else{
        res.status(400).json({
            status: false,
            msg:"error",
            error: "error",
        })
    }
}

exports.del_brand= async (req, res)=>{
    const delete_brands = await brands.deleteOne({_id: req.params.id})
    if(delete_brands){
        res.status(200).json({
            statuts:true,
            msg:"success",
            data:delete_brands,
        })
    }else{
        res.status(400).json({
            status:false,
            msg:"error",
            error:"error"
        })
    }
}

exports.viewone_brand= async(req, res)=>{
    const findonebrand = await brands.findOne({_id: req.params.id});
    if(findonebrand){
        res.status(200).json({
            status:true,
            msg:"success",
            data:findonebrand,
        })
    }else{
        res.status(400).json({
            status:false,
            msg:'error',
            error: 'error',
        })
    }
}

exports.edit_brand = async (req, res)=>{
    const {brand_name, desc, image, status}=req.body;

    data={};
    if(brand_name){
        data.brand_name = brand_name;
    }
    if(desc){
        data.desc = desc;
    }
    if(image){
        data.image = image;
    }
    if(status){
        data.status = status;
    }
    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path);
        data.image =  result.secure_url;
        fs.unlinkSync(req.file.path);
    }
    if(data){
    const updatebrand= await brands.findOneAndUpdate(
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
};