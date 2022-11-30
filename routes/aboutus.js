const express = require('express');
const router = express.Router();

const {
    addaboutus,
    aboutviewone,
    allaboutus,

}=require('../controller/aboutus');




router.post("/admin/addaboutus", addaboutus);
router.get("/admin/aboutviewone/:id", aboutviewone);
router.get("/admin/allaboutus", allaboutus);









module.exports = router;