const express= require("express");
const { cartModel } = require("../Model/cart.model");
const { validator } = require("../Middleware/authentication");
const jwt= require("jsonwebtoken")

const cartRouter= express.Router();

cartRouter.get("/", async(req, res)=>{
    const token= req.headers.authorization;
    if(token){
        jwt.verify(token, 'shop',async (err, decoded)=>{
            if(decoded){
               let id= decoded.userId;
               try {
                const data= await cartModel.find({userId:id});
                res.send(data)
            } catch (error) {
                console.log(error);
                res.send("Unable to fetch User data")
            }
            }
        })
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

cartRouter.delete("/data/:id", async(req, res)=>{
     const id= req.params.id;
     try {
        await cartModel.findByIdAndDelete({_id:id});
        res.send("Deleted Item");
    } catch (error) {
        console.log(error);
        res.send("Unable to delete")
    }
})
cartRouter.delete("/alldata", async(req, res)=>{
    const token= req.headers.authorization;
    if(token){
        jwt.verify(token, 'shop',async (err, decoded)=>{
            if(decoded){
               let id = decoded.userId;
               try {
                await cartModel.deleteMany({userId:id});
                res.send("Purchased Sucessfull")
            } catch (error) {
                console.log(error);
                res.send("data")
            }
            }
        })
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