const request = require("supertest")
const mongoose = require("mongoose")
const app = require("../app.js")
const User = require("../models/users.js")
const Answer = require("../models/answer.js")
const Question = require("../models/question.js")
const connectToDB = require("../config/db.js")
const response = require("express")

const updateDB = async()=>{
await User.deleteMany({});
await Answer.deleteMany({});
await Question.deleteMany({});
}

const timing = async()=>{
    await connectToDB();
    await updateDB()
}

timing()

test('signup for user' , async() => {
    const response = await request(app)
    .post("/user/signup")
    .send({
        username : "testuser1",
        email : "testuser1@gmail.com",
        password : "123456",
        category : "User",
        mobile : 3493294827
    }).expect(200);
},7000)

test('signup for admin' , async() => {
    const response = await request(app)
    .post("/user/signup")
    .send({
        username : "testuser2",
        email : "testuser2@gmail.com",
        password : "123456",
        category : "Admin",
        mobile : 8495839405
    }).expect(200);
},7000)


test('login for user' , async() => {
    const response = await request(app)
    .post("/user/login")
    .send({
        email : "testuser1@gmail.com",
        password : "123456"
    }).expect(200)

    testuser1Token = response.body.token;
    console.log(testuser1Token)
})

test('login test for admin' , async() => {
    const response = await request(app)
    .post("/user/login")
    .send({
        email : "testuser2@gmail.com",
        password : "123456"
    }).expect(201)

    testuser2Token = response.body.token;
    console.log(testuser2Token)
})
