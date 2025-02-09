const express = require("express");
const { Account } = require("../db");
const { authentication } = require("../middleware");
const { mongo, default: mongoose } = require("mongoose");
const accountRouter = express.Router();

accountRouter.get("/balance", authentication,async(req,res) => {
    const account = await Account.findOne({userId : req.userId});

    res.json({
        balance : account.balance
    })
})

accountRouter.post("/transfer",authentication, async(req,res) =>{
    const session = await mongoose.startSession();

    session.startTransaction()

    try{
        const {amount,to} = req.body;

        const amountNumber = Number(amount);
        if(! amount || amount === undefined || isNaN(amountNumber) || amountNumber <= 0){
            await session.abortTransaction()
            return res.status(401).json({
                msg : "Amount cannot be zero"
            })
        }

        const account = await Account.findOne({userId:req.userId}).session(session);;

        if(!account || account.balance < amount){
            await session.abortTransaction()
            return res.status(400).json({
                msg : "Insufficient balance"
            })
        }

        const toAccount = await Account.findOne({userId:to}).session(session);;
        
        if(!toAccount){
            await session.abortTransaction()
            return res.status(400).json({
                msg : "Invalid Account"
            })
        }

        await Account.updateOne({
            userId:req.userId  
        },{
            $inc : {
                balance : -amount
            }
        }).session(session);

        await Account.updateOne({
            userId:to  
        },{
            $inc : {
                balance : amount
            }
        }).session(session);

        await session.commitTransaction()
        console.log("Received amount:", amount);
        return res.json({
            msg : "Transaction successfull"
        }) 
    } catch(err){
        await session.abortTransaction();
        return res.status(500).json({
            msg : "Transaction error"
        })
    } finally {
        session.endSession();
    }
    
})

module.exports = {accountRouter}