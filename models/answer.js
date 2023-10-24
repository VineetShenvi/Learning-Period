const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
  
    answer : {
        type : String, 
        required : true
    },

    question : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    
    views : [{   
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }],
    
    upvotes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],


    downvotes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],

    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }]
},
{
    timestamps : true
})

module.exports = mongoose.model("Answer" , schema)