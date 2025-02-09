const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");
const { authentication } = require("../middleware");


const signupSchema = zod.object({
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string(),
    username:zod.string().email(),
})

userRouter.post("/signup", async(req,res) => {
    const body = req.body;
    const parseBody = signupSchema.safeParse(body);

    if((body.firstName.length < 3) || (body.lastName.length < 3)){
        return res.status(400).json({
            msg:"Name should contain minimum of 3 alphabets"
        })
    }
    if((!body.password) || (body.password.length < 6)){
        return res.status(411).json({
            msg:"Password should contain minimum of 6 alphabets"
        })
    }
    if(!parseBody.success){
        return res.status(500).json({
            msg:"wrong inputs"
        })
    }

    const user = await User.findOne({username:body.username});
    if(user){
        return res.status(401).json({
            msg:"User already exists"
        })
    }

    const dbuser = await User.create(body);

    // creating a new account
    await Account.create({
        userId : dbuser._id,
        balance : 1 + Math.random()*10000
    })

    const token = jwt.sign({userId : dbuser._id}, jwt_secret);

    return res.json({
        msg:"User created successfully",
        token:token
    })
})

userRouter.post("/signin", async(req,res) => {
    const {username,password} = req.body;
    if(!username || !password){
        return res.status(400).json({
            error : "Username and password are required"
        })
    }

    const user = await User.findOne({username:username});
    if(!user){
        return res.status(500).json({
            error : "no such user found"
        })
    }
    if(user.password != password){
        return res.status(411).json({
            error : "Username or password incorrect"
        })
    }
    const token = jwt.sign({userId : user._id}, jwt_secret);
    res.json({
        msg:"User logged in successfully",
        token : token
    })
})

const updateBody = zod.object({
    firstName : zod.string().optional(),
    lastName : zod.string().optional(),
    password : zod.string().optional()
})

userRouter.put("/update", authentication, async(req,res) => {
    const body = req.body;
    const parseBody = updateBody.safeParse(body);

    if(!parseBody.success){
        return res.status(404).json({
            msg:"wrong inputs"
        })
    }

    await User.updateOne({_id:req.userId}, body )

    res.json({
        msg : "Updated succsssfully"
    })

})

userRouter.get("/bulk",async(req,res) =>{
    const filter = req.query.filter || "";
    
    try{
        const user = await User.find({
            $or : [{  // to do two queries at same time (from both first and last name)
                firstName : {
                    "$regex" : filter   // to match the substring
                }
            }, {
                lastName : {
                    "$regex" : filter
                }
            }]
        })

        res.json({
            users : user.map((user)=>({
                username:user.username,
                firstName:user.firstName,
                lastName:user.lastName,
                _id : user._id
            }))
        })
    } catch(err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
    
})

module.exports = {
    userRouter
}
