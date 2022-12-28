const express = require("express");
const router = express.Router();


const {
    add_coupon,
    coupon_list,
    viewone_coupon,
    del_coupon,
    edit_coupon,
}=require("../controller/coupon_code");




router.post("/admin/add_coupon", add_coupon);

router.get("/admin/coupon_list", coupon_list);

router.get("/admin/viewone_coupon/:id", viewone_coupon);

router.delete("/admin/del_coupon/:id", del_coupon);

router.post("/admin/edit_coupon/:id", edit_coupon);


module.exports = router;