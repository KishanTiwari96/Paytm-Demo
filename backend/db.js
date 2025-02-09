const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://kishantiwari698591:boP1dZ1EKhmDY5nf@cluster0.ckpsh.mongodb.net/paytm");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30
    },
    lastName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        maxLength:10
    },
    username:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30,
        lowercase:true,
        unique:true,
    }
});

const accountSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,   // Referenc to User so that if a user exists then only it has balance
        ref : 'User',
        required : true
    },
    balance:{
        type :Number,
        required : true
    }
});

const User = mongoose.model("user",userSchema)
const Account = mongoose.model("account",accountSchema)
module.exports = {
    User,
    Account
}