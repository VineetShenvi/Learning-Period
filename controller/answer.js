const User = require("../models/users")
const Question =  require("../models/question");
const Answer =  require("../models/answer");

const newAnswer = async (req , res)=>{
    try{
    const {answer} = req.body.answer;
    const questionId = req.body.questionId;

    const newAnswer = new Answer({
        user : req.user._id,
        answer,
        question : questionId
    })
    await newAnswer.save();

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $push : { answers : newAnswer._id}
        },
    )

    await Question.findByIdAndUpdate(
        questionId,
        {
            $push : { answer : newAnswer._id}
        },
    )

    res.status(201).send({
        newAnswer
    })
}
catch(e){
    res.json({"Error" : e.message});
}
};

const showAllAnswers = async (req , res )=>{
    try{
    const answers = await Answer.find({user : req.user._id});

    res.status(200).send({
        answers
    })
}
catch(e){
    res.json({
        "Error" : e.message
    });
}
}

const updateAnswer = async (req , res)=>{
    try{
    const updatedAnswer = await Answer.findOneAndUpdate(
        {_id : req.body.answerId},
        req.body,
        {new : true}
    );

    if(!updatedAnswer) return res.status(404).send("Invalid ID!");

     res.status(201).send({
        updatedAnswer
    })
}catch(e){
    console.error(e);
}
};

const likeAnswer = async (req , res)=>{
    //console.log(req.body.answerId)
    try{
    const likedAnswer = await Answer.findOneAndUpdate(
        {
            _id : req.body.answerId},
        {
            $push : { likes : req.user._id}
        },
    );

    if(!likedAnswer) return res.status(404).send("Invalid ID!");

     res.status(201).send({
        likedAnswer
    })
}catch(e){
    console.error(e);
}
};

const dislikeAnswer = async (req , res)=>{
    //console.log(req.body.answerId)
    try{
    const dislikedAnswer = await Answer.findOneAndUpdate(
        {
            _id :  req.body.answerId},
        {
            $push : { dislikes : req.user._id}
        },
    );

    if(!dislikedAnswer) return res.status(404).send("Invalid ID!");

     res.status(201).send({
        dislikedAnswer
    })
}catch(e){
    console.error(e);
}
};

const deleteAnswer = async (req , res )=>{
    try{
    //console.log(req.body.answerId);
    const deletedAnswer = await Answer.findByIdAndDelete(req.body.answerId);

    if(!deletedAnswer) return res.status(404).send("Invalid ID!");
    
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull : { answers : deletedAnswer._id}
        }
    )

    await Question.findByIdAndUpdate(
        deletedAnswer.question,
        {
            $pull : { answers : deletedAnswer._id}
        }
    )
    

     res.status(201).send({
        deletedAnswer
})

}
catch(e){
    console.error(e);
}
};

module.exports ={
    newAnswer,
    showAllAnswers,
    updateAnswer,
    likeAnswer,
    dislikeAnswer,
    deleteAnswer
};

