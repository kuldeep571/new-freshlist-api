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

