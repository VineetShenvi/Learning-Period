const express = require("express");
const app = express();
const {config} =  require("dotenv");
config({
    path:"./config.env",
})
const morgan = require("morgan");
const connectDB = require('./config/db');

app.use(morgan('dev'))
app.use(express.json())

const start = async () => {
    try {
        await connectDB();
        app.listen(process.env.PORT, () => {
            console.log(`Connected to port ${process.env.PORT}.`);
        });
    }  catch (error) {
        console.log(error);
    }
};


const userRouter = require('./routes/user.js')
app.use(userRouter)

const questionRouter = require('./routes/question.js')
app.use(questionRouter)

const answerRouter = require('./routes/answer.js')
app.use(answerRouter)

start();

module.exports = app;




