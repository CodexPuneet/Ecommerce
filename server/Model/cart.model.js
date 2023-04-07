const mongoose= require("mongoose");

const cartSchema= mongoose.Schema({
    title:String,
    image:String,
    price:Number,
    rating:Number,
    userId: String,
    quantity:Number
})

const cartModel= mongoose.model("cart", cartSchema);

module.exports= {
    cartModel
}