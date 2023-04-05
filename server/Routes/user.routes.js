const express= require("express");
const { UserModel } = require("../Model/user.model");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");

const userRouter= express.Router();

userRouter.get("/", async(req, res)=>{
    try {
        const data= await UserModel.find();
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send("Unable to fetch User data")
    }
})

userRouter.post("/signup", async(req, res)=>{
    const data= req.body;
    try {
        bcrypt.hash(data.password, 3, async(err, hashed)=>{
            if(err){
                res.send("Unable to signup")
            }else{
                const newData= new UserModel({...data, password:hashed});
                await newData.save();
                res.send("Successfully Signed Up");
            }
        })
    } catch (error) {
        console.log({"err":error});
        res.send("Unable to signup")
    }
})

userRouter.post("/login", async(req, res)=>{
    const data= req.body;
    try {
        const user= await UserModel.findOne({"email": data.email});
        if(user){
            bcrypt.compare(data.password, user.password, (err, result)=>{
                if(result){
                    const token= jwt.sign({userId:user._id}, 'shop');
                    if(data.email.includes('@admin.com'))
                    {
                        res.send({"msg":"Admin Login", token, user});
                    }
                    else{
                        res.send({"msg":"User Login", token, user});
                    }
                    
                }else{
                    res.send("Invalid Credentials");
                }
            })
        }else{
            res.send("2 Invalid Credentials")
        }
    } catch (error) {
        console.log({"err":error});
        res.send("Unable to signin")
    }
})



module.exports= {
    userRouter
}