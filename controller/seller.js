const sellers = require("../models/seller");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

exports.addseller = async (req, res) => {
  const { firstname, lastname, email, password, cnfrmPassword, image, mobile, status, shop_name, shop_address } = req.body;

  const newsellerdata = sellers({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
    mobile: mobile,
    image: image,
    status: status,
    shop_name: shop_name,
    shop_address: shop_address,
    cnfrmPassword: cnfrmPassword,
  });
  console.log("newsellerdata", newsellerdata);
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    newsellerdata.image = result.secure_url;
    fs.unlinkSync(req.file.path);
  }

  const findexist = await sellers.findOne({email: email});
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newsellerdata
      .save()
      .then((newsellerdata) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: newsellerdata
        })
      })
      .catch((error) => {
        res.status(403).json({
          status: false,
          msg: 'error',
          error: error,
        })
      })
    }
  }

exports.getallseller = async (req, res)=>{
  const findall = await sellers.find().sort({sortorder:1})
  if(findall){
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    })
  }else{
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    })
  }
}

exports.viewone_seller = async (req, res)=>{
  const findexist = await sellers.findOne({_id: req.params.id})
  if(findexist){
    res.status(200).json({
      status: true,
      msg: "success",
      data: findexist,
    })
  }else{
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    })
  }
}

exports.del_seller = async (req, res)=>{
  const deleteseller = await sellers.deleteOne({_id: req. params.id})
  if(deleteseller){
    res.status(200).json({
      status: true,
      msg: "success",
      data: deleteseller,
    })
  }else{
    res.stauts(403).json({
      status: false,
      msg: "error",
      error: error
    })
  }
}


exports.edit_seller = async (req, res)=>{
  const { firstname, lastname, image, mobile, status, shop_name, shop_address } = req.body;

  data={};
  if(firstname){
    data.firstname= firstname;
  }
  if(lastname){
    data.lastname= lastname;
  }
  if(mobile){
    data.mobile= mobile;
  }
  if(image){
    data.image = image;
  }
  if(status){
    data.status = status;
  }
  if(shop_name){
    data.shop_name = shop_name;
  }
  if(shop_address){
    data.shop_address = shop_address;
  }

  if(req.file){
    const result = await cloudinary.uploader.upload(req.file.path);
    data.image = result.secure_url;
    fs.unlinkSync(req.file.path);
  }
  if(data){
    const findoneandupdate = await sellers.findOneAndUpdate(
      {_id: req.params.id},
      {$set: data},
      {new: true}
    )
    if(findoneandupdate){
      res.status(200).json({
        status: true,
        msg: "success",
        data: findoneandupdate,
      })
    }
    else{
      res.status(400).json({
        status:false,
        msg: "error",
        error: error,
      })
    }
  }
}