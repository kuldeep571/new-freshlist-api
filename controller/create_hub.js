const Newhub = require('../models/create_hub');


exports.addhub= async (req, res)=>{
    const {name, desc, mobile, email, address, delivery_zone, category, sub_category, status}=req.body;

    const newhubdata = await Newhub({
        name: name,
        desc: desc,
        mobile: mobile,
        email: email,
        address: address,
        delivery_zone: delivery_zone,
        category: category,
        sub_category: sub_category, 
        status: status,
    });

    const findexist = await Newhub.findOne({email: email});
    if(findexist){
        res.status(403).json({
            status:false,
            msg:"Allready exist",
            data: {},
        })
    }
    else{
        newhubdata
        .save()
        .then((data)=>{
            res.status(200).json({
                status:true,
                msg: "success",
                data: data,
            })
            console.log('newhubdata', newhubdata)
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
