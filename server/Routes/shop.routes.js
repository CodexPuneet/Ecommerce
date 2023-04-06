const express= require("express");
const { shopModel } = require("../Model/shop.model");

const shopRouter= express.Router();

shopRouter.get("/", async(req, res)=>{
    try {
        const data= await shopModel.find();
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send("Unable to fetch User data")
    }
})

shopRouter.post("/", async(req, res)=>{
    const data= req.body;
    try {
       
                const newData= new shopModel(data);
                await newData.save();
                res.send("Item has been listed Sucessfully");
            
        
    } catch (error) {
        console.log({"err":error});
        res.send("Unable to signup")
    }
})

shopRouter.delete("/:id", async(req, res)=>{
     const id= req.params.id;
     try {
        await shopModel.findByIdAndDelete({_id:id});
        res.send("Deleted Item");
    } catch (error) {
        console.log(error);
        res.send("Unable to delete")
    }
})

shopRouter.patch("/:id", async(req, res)=>{
    const data= req.body;
    const id= req.params.id;
    try {
      await shopModel.findByIdAndUpdate({_id:id}, data);
        res.send("Updated Data");
    } catch (error) {
        console.log(error);
        res.send("Unable to update")
    }
})



module.exports= {
    shopRouter
}