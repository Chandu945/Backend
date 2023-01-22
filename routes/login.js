const express = require("express")
const regmodel = require("../models/register")

const router = express.Router()

router.post("/login" , async(req ,res)=>{
    try{
        const { email , password} = req.body
        const data = await regmodel.findOne({email:email})
        if(data == null){
            res.status(404).json({
                status : "failure",
                message : "user not exists"
            })
        }else{
            if(password == data.password){
                res.status(201).json({
                    status : "success",
                    message : "logged in successfully"
                })
            }else{
                res.status(404).json({
                    status : "failure2",
                    message : "Invalid password"
                })
            }
            
        }
    }catch(e){
        res.status(400).json({
            status : "failed",
            message : e.message
        })
    }
})

module.exports = router