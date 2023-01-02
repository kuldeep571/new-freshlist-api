const express = require('express');
const router = express.Router()

const{
    addleave_comment,
    getallleave_comment,
    viewone_comment,
    delete_comment,
}=require("../controller/leave_comment");


router.post("/admin/addleave_comment", addleave_comment);

router.get("/admin/getallleave_comment", getallleave_comment);

router.get("/admin/viewone_comment/:id", viewone_comment);

router.delete("/admin/delete_comment/:id", delete_comment);



module.exports = router;