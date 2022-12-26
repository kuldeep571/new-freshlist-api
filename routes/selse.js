const express = require("express");
const router = express.Router();

const{
    add_selse,
    getall_selse,
    viewone_selse,
    del_selse,
    edit_selse,
}=require('../controller/selse');


router.post("/admin/add_selse", add_selse);

router.get("/admin/getall_selse", getall_selse);

router.get("/admin/viewone_selse/:id", viewone_selse);

router.delete("/admin/del_selse/:id", del_selse);

router.post("/admin/edit_selse/:id", edit_selse);








module.exports = router;