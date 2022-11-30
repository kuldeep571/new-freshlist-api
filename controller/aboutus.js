const Aboutus = require("../models/aboutus");


exports.addaboutus= async (req, res)=>{
    const{aboutus_title, display, sortorder, status}=req.body;

    const result = new Aboutus({
        aboutus_title: aboutus_title,
        display: display,
        sortorder: sortorder,
        status: status,    
    });
    
    const findexist = await Aboutus.findOne({aboutus_title:aboutus_title});
    if(findexist){
        res.status(400).json({
            status: false,
            msg: "Allready Exit",
            data:{},
        });
        // console.log('result', result);
    }else{
        result
        .save()
        .then(res.status(200).json({
            status:true,
            msg:"success",
            data:findexist,
        })
        )
        .catch((error)=>{
            res.status(403).json({
                status:false,
                msg:"error",
                error: error,
            });
        });
    }
};

exports.aboutviewone= async(req, res)=>{
    try {
        const findone=await Aboutus.findOne({_id: req.params.id});
        if(findall){
            res.status(200).json({
                status: true,
                msg: "success",
                data: findone,
            });
        } else{
            res.status(403).json({
                status: false,
                msg: "error",
                error: "error",   

            })
        }
        
    } catch (error) {
        console.log("error", error);
    }
}

exports.allaboutus= async(req, res)=>{
    try {
        const findall = await Aboutus.find().sort({sortorder: 1});
        if(findall){
            res.status(200).json({
                status: true,
                msg:"success",
                data:findall,
            })
        }
        else{
            res.status(403).json({
                status: false,
                msg: "error",
                error: error,
            })
        }
    } catch (error) {
        console.log("error", error);
    }
}