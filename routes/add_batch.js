const express = require('express');
const router = express.Router();

const {
    addbatch,
    getall_batch,
    viewone_addbatch,
    delete_batch,
    edit_batch,

}=require('../controller/add_batch');


router.post("/admin/addbatch", addbatch);

router.get("/admin/getall_batch", getall_batch);

router.get("/admin/viewone_addbatch/:id", viewone_addbatch);

router.delete("/admin/delete_batch/:id", delete_batch);

router.post("/admin/edit_batch/:id", edit_batch);

module.exports = router;