const country_code = require('../models/country_code');


exports.countrycode= async (req, res)=>{
    const {code}=req.body;

    const newcode = await country_code({
        code: code,
    });
    const findexist = await country_code.findOne({code: code});
    if(findexist){
        res.status(403).json({
            status:false,
            msg:"Allready exist",
            data: {},
        })
    }
    else{
        newcode
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

exports.getall_code = async (req, res)=>{
    const findall = await country_code.find().sort({sortorder:1})
    if(findall){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findall,
        })
    }else{
        res.status(400).json({
            status:false,
            msg:"error",
        })
    }

}

exports.viewone_code = async (req, res)=>{
    const findonedata = await country_code.findOne({_id: req.params.id})
    if(findonedata){
        res.status(200).json({
            status: true,
            msg: "success",
            data:findonedata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}