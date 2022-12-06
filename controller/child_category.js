const childcategory = require('../models/child_category');
const cloudinary= require('cloudinary').v2;
const fs = require('fs');
require("dotenv").config();

exports.addchildcategory= async (req, res)=>{
    const {childcategory_name, subcategory_name, desc, image, category}=req.body;

    const newchilscategory = new childcategory({
        childcategory_name: childcategory_name,
        subcategory_name: subcategory_name,
        desc: desc,
        image: image,
        category: category,
    });
    // console.log('result', result);
    const findexist = await childcategory.findOne({childcategory_name: childcategory_name});
    if(findexist){
        res.status(403).json({
            status:false,
            msg: "Allready exist",
            data:{},
        })  
    }else{
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            if(result){
                newchilscategory.image = result.secure_url;
                fs.unlinkSync(req.file.path);
            }
            newchilscategory
            .save()
            .then((data)=>{
                res.status(200).json({
                    status: true,
                    msg: "success",
                    data: data,
                })
            })
            .catch((error)=>{
                res.status(403).json({
                    status:false,
                    msg:"error",
                    error: error,
                })
            })
        }
    }




}