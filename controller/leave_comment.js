const leavecomment = require("../models/leave_comment");

exports.addleave_comment = async(req, res)=>{
    const{
        customerId,
        write_comment,
        name,
        email,
        website,
        date,
        status,
    }=req.body;

    const newleavecomment = new leavecomment({
        customerId: customerId,
        write_comment: write_comment,
        name: name,
        email: email,
        website: website,
        date: date,
        status: status,
    })
    newleavecomment.save()
    .then((newleavecomment)=>{
        res.status(200).json({
            status: true,
            msg: "success",
            data: newleavecomment,
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

exports.getallleave_comment = async(req, res)=>{
    const findalldata = await leavecomment.find().sort({sortorder: 1})
    .populate("customerId")
        if(findalldata){
            res.status(200).json({
                status: true,
                msg: "success",
                data: findalldata,
            })
        }else{
            res.status(400).json({
                status: false,
                msg: "error",
                error: "error",
            })
        }
}

exports.viewone_comment = async(req, res)=>{
    const findalldata = await leavecomment.findOne({_id: req.params.id})
    .populate("customerId")
        if(findalldata){
            res.status(200).json({
                status: true,
                msg: "success",
                data: findalldata,
            })
        }else{
            res.status(400).json({
                status: false,
                msg: "error",
                error: "error",
            })
        }
}


exports.delete_comment = async(req, res)=>{
    const delete_comment = await leavecomment.deleteOne({_id: req.params.id})
    if(delete_comment){
        res.status(200).json({
            status: true,
            msg: "success",
            data: delete_comment,
        })
    }
    else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}