const mongoose = require("mongoose")

const connectDB = () => {
    mongoose.connect(process.env.URI, {
        useUnifiedTopology: true,
        useNewUrlParser:true
    }).then(()=>console.log("Connected to database."));
    
}

module.exports = connectDB;