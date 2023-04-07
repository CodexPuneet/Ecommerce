const express= require("express");
const { cartModel } = require("../Model/cart.model");

const cartRouter= express.Router();

cartRouter.get("/", async(req, res)=>{
    try {
        const data= await cartModel.find();
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send("Unable to fetch User data")
    }
})

cartRouter.post("/", async(req, res)=>{
    const data= req.body;
    try {
       
                const newData= new cartModel(data);
                await newData.save();
                res.send("Item has been added Sucessfully");
            
        
    } catch (error) {
        console.log({"err":error});
        res.send("Unable to Post")
    }
})

cartRouter.delete("/:id", async(req, res)=>{
     const id= req.params.id;
     try {
        await cartModel.findByIdAndDelete({_id:id});
        res.send("Deleted Item");
    } catch (error) {
        console.log(error);
        res.send("Unable to delete")
    }
})

cartRouter.patch("/:id", async(req, res)=>{
    const data= req.body;
    const id= req.params.id;
    try {
      await cartModel.findByIdAndUpdate({_id:id}, data);
        res.send("Updated Data");
    } catch (error) {
        console.log(error);
        res.send("Unable to update")
    }
})



module.exports= {
    cartRouter
}