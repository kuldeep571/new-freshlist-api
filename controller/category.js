const Category = require('../models/category')
const cloudinary= require('cloudinary').v2;
const fs = require('fs');


require("dotenv").config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


// exports.addcategory = async (req, res) => {

//     const {category_name, desc, image} = req.body;
    
//     const addusercategory = new Category({
//         category_name: category_name,
//          desc: desc,
//         image: image,
//     });
//     // console.log('addusercategory', addusercategory);
//     if(req. file){
//         const findexist = await Category.findOne({category_name: category_name});
//         if(findexist){
//             res.status(403).json({
//                 status : false,
//                 msg: "Already exist",
//                 data: {},
//             });
//         }else{
//             const result = await cloudinary.uploader.upload(req.file.path);
//             if(result){
//                 addusercategory.img = result.secure_url;
//                 fs.unlinkSync(req.file.path);
//                 addusercategory
//                 .save()
//                 .then((data)=>{
//                     res.status(200).json({
//                         stauts: true,
//                         msg: "success",
//                         data: data,
//                     })
//                 })
//                 .catch((error)=>{
//                     res.status(400).json({
//                         status: false,
//                         msg: "error",
//                         error: error,
//                     });
//                 });
//             }else{
//                 res.status(200).json({
//                     status: false,
//                     msg: "img not upload",
//                 });
//             }
//         }
//     }
// };



exports.addcategory= async (req, res) => {
    const { title, category_name, url, type, thumbnail_img, feature, desc, image} = req.body;
  
    const newCategory = new Category({
        title:title,
        category_name:category_name,
        url: url,
        type:type,
        thumbnail_img:thumbnail_img,
        feature:feature,
        desc:desc,
        image:image
     });
     const findexist = await Category.findOne({ category_name: category_name });
     if (findexist) {
      // resp.alreadyr(res);
      res.json({
        status: false,
        msg: "Allready exist",
        data:{},
      })
     } else{
        if (req.files.image[0].path) {
            image_array = [];
            for (let i = 0; i < req.files.image.length; i++) {
              const resp = await cloudinary.uploader.upload(
                req.files.image[i].path,  
              );
              fs.unlinkSync(req.files.image[i].path);
              image_array.push(resp.secure_url);
            }
            newCategory.image = image_array;
          }
          if (req.files.thumbnail_img[0].path) {
            thumbnail_img_array = [];
            for (let i = 0; i < req.files.thumbnail_img.length; i++) {
              const resp = await cloudinary.uploader.upload(
                req.files.thumbnail_img[i].path,
                { use_filename: true, unique_filename: false },
                function (cb) {
                  // console.log(cb);
                }
              );
              fs.unlinkSync(req.files.thumbnail_img[i].path);
              thumbnail_img_array.push(resp.secure_url);
            }
            newCategory.thumbnail_img = thumbnail_img_array;
          }
          if (req.files) {
            if (req.files.cat_img[0].path) {
              alluploads = [];
              for (let i = 0; i < req.files.cat_img.length; i++) {
                const resp = await cloudinary.uploader.upload(
                  req.files.cat_img[i].path,
                  { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.cat_img[i].path);
                alluploads.push(resp.secure_url);
              }
              newCategory.cat_img = alluploads;
            }
          }
      newCategory
         .save()
         .then((data)=>{
            res.status(200).json({
                stauts: true,
                msg: "success",
                data: data,
            })
        })
        .catch((error)=>{
            res.status(400).json({
                status: false,
                msg: "error",
                error: error,
            });
        });
      }
}

exports.getallcategory= async (req, res)=>{
    const findall = await Category.find().sort({
        sortorder: 1,
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

exports.viewonecategory= async (req, res)=>{
    const findone= await Category.findOne({_id: req.params.id});
    if(findone){
        res.status(200).json({
            status: true,
            msg:"success",
            data:findone,
        })
    }else{
        res.status(403).json({
            status:false,
            msg:"error",
            error: error,
        })
    }
}

exports.del_one_category= async(req, res)=>{
    const deleteuser = await Category.deleteOne({_id: req.params.id});
    if(deleteuser){
        res.status(200).json({
            status:true,
            msg:"success",
            data:deleteuser,
        })
        res.status(403).json({
            status:false,
            msg:"error",
            error:"error",
        })
    }
}

exports.category_true_false= async(req, res)=>{
    const {status}=req.body;
    const findupdate = await Category.findOneAndUpdate(
        {_id: req.params.id},
        {$set:{status:status}},
        {new:true},
    );
    if(findupdate){
        res.status(200).json({
            status:true,
            msg:"success",
            status:findupdate.status,
        })
    }else{
        res.status(403).json({
            status:false,
            msg:"error",
            error: "error",
        })
    }
}

exports.edit_category= async(req, res)=>{
    const {category_name, desc, image, status}=req.body;

    data={};
    if(category_name){
        data.category_name = category_name;
    }
    if(desc){
        data.desc = desc; 
    }
    if(image){
        data.image = image;
    }
    if(status){
        data.status= status;
    }
    if(req.file){
        const responce = await cloudinary.uploader.upload(req.file.path);
        data.image = responce.secure_url;
        fs.unlinkSync(req.file.path);
    }
    if(data){
        const findexist = await Category.findOneAndUpdate(
            { _id: req.params.id },
            {$set: data},
            {new:true}
        );
        if(findexist){
            res.status(200).json({
                status: true,
                msg:"success",
                data: findexist,
            })
        }else{
            res.status(400).json({
                status:false,
                msg:"error",
                error:"error",
            })
        }
    }
}