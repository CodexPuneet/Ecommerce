const mongoose= require("mongoose");

const shopSchema= mongoose.Schema({
    title:String,
    image:String,
    price:Number,
    rating:Number
})

const shopModel= mongoose.model("shop", shopSchema);

module.exports= {
    shopModel
}