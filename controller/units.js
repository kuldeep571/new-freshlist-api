const units = require('../models/units');


exports.addunits= async (req, res)=>{
    const {units_name, desc}=req.body;

    const newunits = await units({
        units_name: units_name,
        desc: desc,
    });

    const findexist = await units.findOne({units_name: units_name});
    if(findexist){
        res.status(403).json({
            status:false,
            msg:"Allready exist",
            data: {},
        })
    }
    else{
        newunits
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

exports.getall_units = async (req, res)=>{
    const findall = await units.find().sort({sortorder:1})
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

exports.edit_units = async (req, res)=>{
    const findandUpdateEntry = await units.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new: true}
    )
    if(findandUpdateEntry){
        res.status(200).json({
            status:true,
        })
    }
}

exports.del_units= async (req, res)=>{
    const deleteunits= await units.deleteOne({_id: req.params.id})
    if(deleteunits){
        res.status(200).json({
            status:true,
            msg:"success",
            data:deleteunits,
        })
    }else{
        res.status(400).json({
            status:"false",
            msg:"error",
        })
    }
}