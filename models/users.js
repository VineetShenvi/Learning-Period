const mongoose = require("mongoose")
const validator = require("validator")

const validatePhoneNumber = require('../utilities/phoneValidation')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("Invalid e-mail id")
            }
        }
    },
    mobileno:{
        type:Number,
        unique:true,
        required:true,
        validate(value){
            if(!validatePhoneNumber(value)){
                throw new error("Invalid phone number")
            } 
        }
    },
    questions:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Question'
    }],
    answers:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Answer'
    }],
    followers:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    following:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }]
},
{
    timestamps : true
});

module.exports=mongoose.model('User',userSchema)
