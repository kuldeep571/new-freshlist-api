const subproductcategories = require('../models/sub_category');
const cloudinary= require('cloudinary').v2;
const fs = require('fs');
require("dotenv").config();


exports.addsubcategory= async (req, res)=>{
    const {subcategory_name, desc, image}=req.body;

    const  newsubcategory = subproductcategories({
        subcategory_name: subcategory_name,
        desc: desc,
        image: image
    });
    const findexist = await subproductcategories.findOne({subcategory_name: subcategory_name});
    console.log('findexist', findexist)
    if(findexist){
        res.status(403).json({
            status:false,
            msg:"Allready exist",
            data:{},
        })
    }else{
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            if(result){
                newsubcategory.image = result.secure_url;
                fs.unlinkSync(req.file.path);
            }
            newsubcategory
            .save()
            .then((data)=>{
                res.status(200).json({
                    status:true,
                    msg:"success",
                    data:data,
                })
            })
            .catch((error)=>{
                res.status(403).json({
                    status:true,
                    msg:"error",
                    error: error,
                })
            })
        }
    }
}

exports.getalldata= async (req, res)=>{
    const findall = await subproductcategories.find().sort({
        sortorder:1
    });
    if(findall){
        res.status(200).json({
            status:true,
            msg:"success",
            data:findall,
        })
    }else{
        res.status(403).json({
            status:false,
            msg:"error",
            error: "error",
        })
    }
}

exports.sub_viewonedata= async(req, res)=>{
    const findone=await subproductcategories.findOne({_id: req.params.id})
    if(findone){
        res.status(200).json({
            status:true,
            msg:'success',
            data:findone,
        })
    }else{
        res.status(403).json({
            status:false,
            msg:"error",
            error:"error",
        })
    }
}

exports.del_subcategory= async(req, res)=>{
    const deleteone = await subproductcategories.deleteOne({_id: req.params.id});
    if(deleteone){
        res.status(200).json({
            status:true,
            msg:'success',
            data:deleteone,
        })
    }else{
        res.status(403).json({
            status:false,
            msg:'error',
            error:"error",
        })
    }
}


