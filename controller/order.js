const orderproduct = require('../models/order');
const { v4: uuidv4 } = require("uuid");

create_random_string(6);
function create_random_string(string_length) {
  (random_string = ""),
    (characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz");
  for (var i, i = 0; i < string_length; i++) {
    random_string += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return random_string;
}

exports.addorder = async (req, res)=>{

    const {
        customerId,
        orderId,
        name,
        delivery_slot,
        product,
        attribute,
        quantity,
        orderd_from,
        phone_no,
        order_zone,
        billing_add,
        delivery_add,
        order_date,
        delivery_date,
        time_slot,
        items,
        assing_drive,
        email,
        notify,
        previous_add,
        new_address,
        status
    }=req.body;

    const neworder = new orderproduct({
        customerId: customerId,
        orderId: random_string,
        orderd_from: orderd_from,
        name: name,
        delivery_slot: delivery_slot,
        product: product,
        attribute:attribute,
        quantity:quantity,
        phone_no: phone_no,
        order_zone: order_zone,
        billing_add: billing_add,
        delivery_add: delivery_add,
        order_date: order_date,
        delivery_date: delivery_date,
        time_slot: time_slot,
        items: items,
        assing_drive: assing_drive,
        email: email,
        notify: notify,
        previous_add: previous_add,
        new_address: new_address,
        status: status
    })
    
    const findexist = await orderproduct.findOne({orderId: orderId })

    if(findexist){
        res.status(403).json({
            status: false,
            msg: "allready exist",
            data:{},
        })
    }else{
        neworder
        .save()
        .then((data)=>{
            res.status(200).json({
                status: true,
                msg: "success",
                data: data,
            })
        })
        .catch((error)=>{
            res.status(400).json({
                status: false,
                msg:"error",
                error: error,
            })
        })
    }
}

exports.allorder_list = async (req, res)=>{
    const getalldata = await orderproduct.find().sort({sortorder: 1})
    .populate("product")
    .populate("attribute")
    if(getalldata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: getalldata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.viewone_order = async (req, res)=>{
    try {
        const vieworder_data = await orderproduct.findOne({_id: req.params.id})
        res.status(200).json({
            status: true,
            msg: "success",
            data: vieworder_data,
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

exports.del_order = async (req, res)=>{
    try {
        const deletedata = await orderproduct.deleteOne({_id: req.params.id})
        res.status(200).json({
            status: true,
            msg: "success",
            data: deletedata,
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

exports.edit_order = async(req, res)=>{
    const updateone = await orderproduct.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new: true},
    )
    if(updateone){
        res.status(200).json({
            status: true,
            msg: "success",
            data: updateone,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.pending_order = async(req, res)=>{
    const findpending_order = await orderproduct.find({status:"Pending"})
    .populate("product")
    .populate("attribute")
    .then((findpending_order)=>{
        res.status(200).json({
            status: true,
            msg: "success",
            data: findpending_order,
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

exports.complete_order = async(req, res)=>{
    const resultdata = await orderproduct.find({status:"complete"})
    if(resultdata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: resultdata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.canceled_order = async(req, res)=>{
    const canceldata = await orderproduct.find({status: "cancel"})
    if(canceldata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: canceldata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.out_of_delivery = async(req, res)=>{
    const outofdata = await orderproduct.find({status: "out_of_delivery"});
    if(outofdata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: outofdata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.inprocess_order = async(req, res)=>{
    const inprocess_data = await orderproduct.find({status: "inprocess"})
    if(inprocess_data){
        res.status(200).json({
            status: false,
            msg: "error",
            data: inprocess_data,
        })
    }else{
        res.status(400).json({
            status: true,
            msg: "error",
            error: "error",
        })
    }
}

exports.delivery_order = async(req, res)=>{
    const deliveryorder = await orderproduct.find({status: "Delivery"})
        if(deliveryorder){
            res.status(200).json({
                status: true,
                msg: "success",
                data: deliveryorder,
            })
        }else{
            res.status(400).json({
                status: false,
                msg: "error",
                error: "error",
            })
        }
}

exports.total_order = async(req, res)=>{
    const finddata = await orderproduct.countDocuments()
    .then((finddata)=>{
        res.status(200).json({
            status: true,
            msg: "success",
            data: finddata,
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


exports.returned_order = async(req, res)=>{

    const returned_data = await orderproduct.find({status: "returned"})
    
    if(returned_data){
        res.status(200).json({
            status: true,
            msg: "success",
            data: returned_data,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.customer_order_list = async(req, res)=>{
    const findexist = await orderproduct.find({customerId: req.params.id})
    .populate("customerId")
    .populate("product")
    if(findexist){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findexist,
        })
    }else{
        res.status(400).json({
            status: false,
            mag: "error",
            error: "error",
        })
    }
}

// exports.dailybyselse = async(req, res)=>{
//     const sailbroduct = await orderproduct({
//         $and: [{id: req.c }, { status: "Complete" }],
//     })
// }
