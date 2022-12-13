const express= require("express");
const router = express.Router();



const {
    addhub,
    hublist,
    viewone_hub,
   
}=require('../controller/create_hub');


router.post('/admin/addhub', addhub);

router.get('/admin/hublist', hublist);

router.get('/admin/viewone_hub/:id', viewone_hub);

module.exports = router;