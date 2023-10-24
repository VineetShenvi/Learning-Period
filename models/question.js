const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
  
    question : {
        type : String, 
        required : true
    },
    
    category :  {
        type : String,
        enum : ["Sports", "Education", "Entertainment", "Tourism", "Health", "History", "Geography", "Science", "Mathematics", "Other"],
        default: "Other",
        required : true
    },

    answers : [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Answer'
    }],

    likes : [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }],

    dislikes : [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }],
    
    views : {   
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'User',
    } 
},
{
    timestamps : true
})

module.exports = mongoose.model("Question" , schema)