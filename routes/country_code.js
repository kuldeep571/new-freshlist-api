const express= require("express");
const router = express.Router();



const {
    countrycode,
    getall_code,
    viewone_code
    
}=require('../controller/country_code');


router.post('/admin/countrycode', countrycode);

router.get('/admin/getall_code', getall_code);

router.get('/admin/viewone_code/:id', viewone_code);


module.exports = router;