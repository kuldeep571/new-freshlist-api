const express = require('express');
const router = express.Router();


const {
    add_attribute,
    getall_attribute,
    del_attribute,
    viewone_attribute,
    edit_attribute
}= require('../controller/attribute');

router.post("/admin/add_attribute", add_attribute);

router.get("/admin/getall_attribute", getall_attribute);

router.delete("/admin/del_attribute/:id", del_attribute);

router.get("/admin/viewone_attribute/:id", viewone_attribute);

router.post("/admin/edit_attribute/:id", edit_attribute);





module.exports = router;