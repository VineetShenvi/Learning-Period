const User = require("../models/users")
const Question =  require("../models/question");

const newQuestion = async (req , res)=>{
    try{
    const {question , category} = req.body;

    const newQuestion = new Question({
        question :question,
        category : category,
        user : req.user._id
    })
    await newQuestion.save();

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $push : { questions : newQuestion._id}
        },
    )

    res.status(201).send({
        newQuestion
    })
}
catch(e){
    res.json({"Error" : e.message});
}
};

const showAllQuestions = async (req , res )=>{
    try{
    const questions = await Question.find({user : req.user._id});

    res.status(200).send({
        questions
    })
}
catch(e){
    res.json({
        "Error" : e.message
    });
}
}

const updateQuestion = async (req , res)=>{
    console.log(req.body.questionId)
    try{
    const updatedQuestion = await Question.findOneAndUpdate(
        {_id : req.body.questionId},
        req.body,
        {new : true}
    );

    if(!updatedQuestion) return res.status(404).send("Invalid ID!");

     res.status(201).send({
        updatedQuestion
    })
}catch(e){
    console.error(e);
}
};

const uploadFile = async(req,res) => {
    console.log(req.files);
    const files = req.files;
    if(!files){
        return res.status(400).send(" Please upload a file.")
    }
    try{
        files.forEach(async(file) =>{
            console.log(file.path);
            console.log(req.body.questionId);
            await Question.findOneAndUpdate(
                {
                    _id : req.body.questionId
                },
                {
                    $push : {pictures : file.path}
                }
            )
        }
        );
        res.status(200).send("Image uploaded successfully!")
    }
    catch (err) {
        res.status(500).json(err.message)
        console.log(err.message);
    }
};

const likeQuestion = async (req , res)=>{
    try{
    const updatedQuestion = await Question.findOneAndUpdate(
        {
            _id : req.body.questionId},
        {
            $push : { likes : req.user._id}
        },
    );

    if(!updatedQuestion) return res.status(404).send("Invalid ID!");

     res.status(201).send({
        updatedQuestion
    })
}catch(e){
    console.error(e);
}
};

const dislikeQuestion = async (req , res)=>{
    //console.log(req.body.questionId)
    try{
    const updatedQuestion = await Question.findOneAndUpdate(
        {
            _id : req.body.questionId},
        {
            $push : { dislikes : req.user._id}
        },
    );

    if(!updatedQuestion) return res.status(404).send("Invalid ID!");

     res.status(201).send({
        updatedQuestion
    })
}catch(e){
    console.error(e);
}
};

const deleteQuestion = async (req , res )=>{
    //console.log(req.body.questionId);
    try{
    console.log(req.body.questionId);
    const deletedQuestion = await Question.findByIdAndDelete(req.body.questionId);

    if(!deletedQuestion) return res.status(404).send("Invalid ID , question does not exist");
    
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull : { questions : deletedQuestion._id}
        }
    )
    

     res.status(201).send({
        deletedQuestion
})

}
catch(e){
    console.error(e);
}
};

const filterByCategory = async(req, res) => {
    filteredQuestions = await Question.find({
        category : req.body.category
    });

    filteredQuestions.forEach((question) => {
        console.log(question.question);
    });

    res.status(200);
}

module.exports ={
    newQuestion,
    showAllQuestions,
    updateQuestion,
    uploadFile,
    likeQuestion,
    dislikeQuestion,
    deleteQuestion,
    filterByCategory
};