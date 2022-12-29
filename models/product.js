const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    customerId: {
      type: String,
    },
    product_name: {
      type: String,
    },
    description: {
        type: String,
    },
    type:{
      type: String,
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref:"brands",
    },
    model:{
       type: String,
    },
    quantity:{
        type: Number,
    },
    gst_class:{
        type: String,
     },
    min_selling_Q: {
      type: Number,
    },
    max_selling_Q: {
      type: Number,
    },
    reward_points:{
      type:String,
    },
    product_image:{
        type:String,
    },
    video_url:{
        type:String,
    },
    metadata:{
        type:String,
    },
    meta_desc:{
        type:String,
    },
    product_search_tags:{
        type:String,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    sub_category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"subproductcategories",
    },
    mrp:{
        type:Number,
    },
    buying_price1:{
        type:Number,
    },
    m_margin1:{
        type:Number,
    },
    buying_price:{
        type:Number,
    },
    m_margin:{
        type:Number,
    },
    selling_price:{
        type:Number,
    },
    m_customer:{
        type:String,
    },
    save_parsent:{
        type:Number,
    },
    units_name:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"units",
    },
    stock:{
        type: Number,
    },
    color :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"color",
    },
    size :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"sizes",
    },
    status:{
        type: String,
        default: "Active",
    },
    bundle:{
        type:String,
    },
    fix_price:{
        type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productSchema);
