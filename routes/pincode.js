const express = require('express');
const router = express.Router();



const {
    addpincode,
    getall_pincode,
    del_pincode,
    viewone_pincode,
    
}= require("../controller/pincode");





router.post("/admin/addpin", addpincode);

router.get("/admin/getall_pincode", getall_pincode);

router.delete("/admin/del_pincode/:id", del_pincode);

router.get("/admin/viewone_pincode/:id", viewone_pincode);




module.exports = router;
