const hub = require("../models/hub");

exports.addhub = async (req, res)=>{
    const {name, desc, mobile, address}=req.body;

    const newhub = new hub({
        name: name,
        desc: desc,
        mobile: mobile,
        address: address,
    })
    const findexist = await hub.findOne({mobile: mobile})
    if(findexist){
        res.status(403).json({
            status: false,
            msg: "Allready exist",
            data: {},
        })
    }else{
        newsize
        .save()
        .then((newsize)=>{
            res.status(200).json({
                status: true,
                msg: "success",
                data: newsize,
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

// exports.getall_size = async (req, res)=>{
//     const findalldata = await size.find().sort({sortorder: 1})
//     if(findalldata){
//         res.status(200).json({
//             status: true,
//             msg: "success",
//             data: findalldata,
//         })
//     }else{
//         res.status(400).json({
//             status: false,
//             msg: "error",
//             error: error
//         })
//     }
// }

// exports.del_size = async (req, res)=>{
//     const deletedata = await size.deleteOne({_id: req.params.id});
//     if(deletedata){
//         res.status(200).json({
//             status: true,
//             msg: "success",
//             data: deletedata,
//         })
//     }else{
//         res.status(400).json({
//             status: false,
//             msg: "error",
//             error: error,
//         })
//     }
// }

// exports.viewone_size = async (req, res)=>{
//     const findexist = await size.findOne({_id: req.params.id})
//     if(findexist){
//         res.status(200).json({
//             status: true,
//             msg: "success",
//             data: findexist
//         })
//     }else{
//         res.status(400).json({
//             status: false,
//             msg: "error",
//             error: error,
//         })
//     }
// }

// exports.edit_size = async (req, res)=>{
//     const findupdate = await size.findOneAndUpdate(
//         {_id: req.params.id},
//         {$set: req.body},
//         {new: true}
//     );
//     if(findupdate){
//         res.status(200).json({
//             status: true,
//             msg: "success",
//             data: findupdate,
//         })
//     }else{
//         res.status(400).json({
//             status: false,
//             msg: "error",
//             error: error,
//         })
//     }
// }