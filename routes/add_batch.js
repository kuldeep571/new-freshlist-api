const express = require('express');
const router = express.Router();

const {
    addbatch,
   

}=require('../controller/add_batch');


router.post("/admin/addbatch", addbatch);

module.exports = router;