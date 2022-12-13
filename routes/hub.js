const express= require("express");
const router = express.Router();



const {
    addhub,
  
  
}=require('../controller/hub');


router.post('/admin/addhub', addhub);


module.exports = router;