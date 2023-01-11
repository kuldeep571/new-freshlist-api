const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const mongoose = require("mongoose");
//const cors = require("cors");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const user = require("./routes/user");
const adminlogin = require("./routes/adminlogin");
const aboutus = require("./routes/aboutus");
const seller = require("./routes/seller");
const category= require("./routes/category");
const subcategory = require("./routes/sub_category");
const brands = require("./routes/brand");
const units = require("./routes/units");
const product = require("./routes/product");
const child_category = require("./routes/child_category");
const language = require("./routes/language");
const color = require("./routes/color");
const size = require("./routes/size");
const addbatch = require("./routes/add_batch");
const country_code = require("./routes/country_code");
const banner = require("./routes/banner");
const create_hub = require("./routes/create_hub");
const order = require("./routes/order");
const shop_wishlist = require("./routes/shop_wishlist");
const shop_cart = require("./routes/shop_cart");
const blog = require("./routes/blog");
const wallet = require("./routes/wallet");
const assing_drive = require("./routes/assing_drive");
const vendor = require("./routes/vendor");
const attribute = require("./routes/attribute");
const selse = require("./routes/selse");
const pincode = require("./routes/pincode");
const vehicle = require("./routes/vehicle");
const coupon_code = require("./routes/coupon_code");
const leave_comment = require("./routes/leave_comment");
const refundrequest = require("./routes/refundrequest");

//app all api

const appuser = require("./routes/appuser")
const app_driver = require("./routes/app_driver");



app.use('/', user);
app.use('/', adminlogin);
app.use('/', aboutus);
app.use('/', seller);
app.use('/', category);
app.use('/', subcategory);
app.use('/', brands);
app.use('/', units);
app.use('/', child_category);
app.use('/', product);
app.use('/', language);
app.use('/', color);
app.use('/', size);
app.use('/', addbatch); 
app.use('/', country_code);
app.use('/', banner);
app.use('/', create_hub);
app.use('/', order);
app.use('/', shop_wishlist);
app.use('/', shop_cart);
app.use('/', blog);
app.use('/', wallet);
app.use('/', assing_drive);
app.use('/', vendor);
app.use('/', attribute);
app.use('/', selse);
app.use('/', pincode);
app.use('/', vehicle);
app.use('/', coupon_code);
app.use('/', leave_comment);
app.use('/', refundrequest);

// app user api

app.use('/', appuser);
app.use('/', app_driver);




app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});

//console.log(process.env.DATABASE);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useNewUrlParser: true,                 
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then(() => {
    console.log("DB CONNECTED SUCCEFULLY");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT || 8000, () => {
  console.log("Example app listening on port 8000");
});

