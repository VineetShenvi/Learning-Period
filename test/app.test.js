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
        password : "1234567",
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
    testUser1ID = response.body.user._id;
    console.log(testuser1Token)
},7000)

test('login test for admin' , async() => {
    const response = await request(app)
    .post("/user/login")
    .send({
        email : "testuser2@gmail.com",
        password : "123456"
    }).expect(201)

    testuser2Token = response.body.token;
    console.log(testuser2Token)
},7000)

test('view profile' , async()=>{

    await request(app)
    .get("/user/profile")
    .set("authorization" , `bearer ${testuser1Token}`)
    .expect(200)
},7000)

test('follow someone test' , async() => {
    await request(app)
    .post("/user/followUser")
    .set("authorization" , `bearer ${testuser1Token}`)
   .send({
        _id : testUser1ID
    })
    .expect(200)
},7000)

test('upload profile pic test' , async() => {
    await request(app)
    .post("/user/profilepic")
    .set("authorization" , `bearer ${testuser1Token}`)
    .attach('file',("D:/unicode_node_lp/test/testProfilePic.png"))
    .expect(200)
},7000)

let testQuestion1ID = "";

test('ask question test' , async() => {
    const response = await request(app)
    .post("/question/new")
    .set("authorization" , `bearer ${testuser1Token}`)
    .send({
        question : "Test Question 1",
        category : "Sports"
    }).expect(201)

    testQuestion1ID = response.body.postedQuestion._id;
    console.log("Test Question 1 ID" , testQuestion1ID);
},7000)

test('get question test' , async() => {
    await request(app)
    .get("/question/show")
    .set("authorization" , `bearer ${testuser1Token}`)
    .expect(200)
},7000)

test('update question test' , async() => {
    await request(app)
    .patch("/question/update")
    .set("authorization" , `bearer ${testuser1Token}`)
    .send({
        question : "Test Question 1 Updated",
        category : "Sports",
        questionId : testQuestion1ID
    }).expect(200)
},7000)

test('search questions by category test' , async() => {
    await request(app)
    .get("/question/filter")
    .set("authorization" , `bearer ${testuser1Token}`)
    .send({
        category : ["Sports"]
    })
    .expect(200)
},7000)

test('upvote question test' , async() => {
    await request(app)
    .post("/question/likeQuestion")
    .set("authorization" , `bearer ${testuser1Token}`)
    .send({
        questionId : testQuestion1ID
    })
    .expect(201)
},7000)


test('downvote question test' , async() => {
    await request(app)
    .post("/question/dislikeQuestion")
    .set("authorization" , `bearer ${testuser1Token}`)
    .send({
        questionId : testQuestion1ID
    })
    .expect(201)
},7000)

test('user delete question test' , async() => {
    await request(app)
    .delete("/question/delete")
    .set("authorization" , `bearer ${testuser1Token}`)
    .send({
        questionId : testQuestion1ID
    })
    .expect(201)
},7000)


/*let testAnswer1ID = "";

test('give answer' , async() => {
    const response = await request(app)
    .post(`/answer/${testQuestion1ID}`)
    .set("authToken" , testUser1token)
    .send({
        answer : "Test Answer 1"
    })
    .expect(200)
    console.log(testQuestion1ID)
    testAnswer1ID = response.body.createdAnswer._id
    
    console.log("Test Answer 1 ID " , testAnswer1ID);
})

test('get answers test' , async() => {
    await request(app)
    .get("/answer/get")
    .set("authToken" , testUser1token)
    .expect(200)
})

test('update answer test' , async() => {
    await request(app)
    .put(`/answer/${testAnswer1ID}`)
    .set("authToken" , testUser1token)
    .send({
        answer : "Test Answer 1 Updated"
    })
    .expect(200)

    console.log(testAnswer1ID)
})

test('upvote answer test' , async() => {
    await request(app)
    .post(`/answer/upvote/${testAnswer1ID}`)
    .set("authToken" , testUser1token)
    .expect(200)

    console.log(testAnswer1ID)
})


test('downvote answer test' , async() => {
    await request(app)
    .post(`/answer/downvote/${testAnswer1ID}`)
    .set("authToken" , testUser1token)
    .expect(200)

    console.log(testAnswer1ID)
})

test('normal user delete answer test' , async() => {
    await request(app)
    .delete(`/answer/${testAnswer1ID}`)
    .set("authToken" , testUser2token)
    .expect(400)

    console.log(testAnswer1ID)
})

test('admin delete answer test' , async() => {
    await request(app)
    .delete(`/answer/${testAnswer1ID}`)
    .set("authToken" , testUser1token)
    .expect(201)

    console.log(testAnswer1ID)
})*/
