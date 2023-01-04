const wishlist = require('../models/shop_wishlist');



exports.addwishlist = async(req, res)=>{
    const {
        customer,
        product,
        stock_status,
    }=req.body;

    const newwishlist = new wishlist({
        customer: customer,
        product: product,
        stock_status: stock_status
    });

    // const findexist = await wishlist.findOne({product: product});
    // if(findexist){
    //     res.status(403).json({
    //         status: false,
    //         msg: "Allready exist",
    //         data:{},
    //     })
    // }
    newwishlist
    .save()
    .then((newwishlist)=>{
        res.status(200).json({
            status: true,
            msg: "success",
            data: newwishlist,
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


exports.all_wishlist = async (req, res)=>{
    const findalldata = await wishlist.find({customer: req.params.id})
    .populate("product")
    if(findalldata){
        res.status(200).json({
            status: true,
            msg: "success",
            length: findalldata.length,
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

exports.remove_wishlist = async (req, res)=>{
    const deletedata = await wishlist.deleteOne({_id: req.params.id})
    // console.log('deletedata', deletedata)
    // return false;
    if(deletedata){
        res.status(200).json({
            status: true,
            msg: "Delete success",
            data: deletedata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}




