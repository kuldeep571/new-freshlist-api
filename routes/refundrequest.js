const express = require('express');
const router = express.Router();

const {
    addrefund,

}=require("../controller/refundrequest");

router.post("/admin/addrefund", addrefund);


module.exports = router;