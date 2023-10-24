const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
  
    answer : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Answer'
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
},
{
    timestamps : true
})

module.exports = mongoose.model("Comment" , schema)