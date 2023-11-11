const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const User = require('../models/users')
const sendMail = require('../utilities/mailer')
const cloudinary = require("../config/cloudinary");


const signup = async (req,res)=>{
    try{
        username = req.body.username
        password = req.body.password
        email = req.body.email
        mobileno = req.body.mobile
        let DB_user = await User.findOne({ email });
        if (DB_user)
        return res.status(404).json({
        success: false,
        message: "User already exists",
        });


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user=new User({
            username : username,
            password : hashedPassword,
            email : email,
            mobile : mobileno,
        });
        const user1=await user.save()
        res.send("Successful sign-up!")
    }
    catch(error){
        res.status(500).send(error)
        console.log(error)
    }
}

const login = async(req,res) => {
    try{
        const email = req.body.email
        const password = req.body.password

        const user = await User.findOne({email:email})
        if( !user ) return res.status(201).send("Incorrect email-id or password.")

        const validPassword = await bcrypt.compare(password, user.password);
        if( !validPassword ) return res.status(201).send("Incorrect email-id or password.")

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "15m"})
        res.json({
            success: true,
            message: "Successful registration",
            user,
            token,
        });
        sendMail();
    }
    catch(error){
        res.status(500).send(error)
    }
}

const updateUser = async (req , res)=>{
    
    try{
    const updatedUser = await User.findOneAndUpdate(
        {_id : req.user._id},
        req.body,
        {new : true}
    );

    if(!updatedUser) return res.status(404).send("Please login first.");

     res.status(201).send({
        success : true,
        message : "User updated.",
        updatedUser
    })
}catch(e){
    console.error(e);
}};

const getProfile = async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
  
    if (user) {
      res.status(200).json({
        success: true,
        user,
      });
    } else {
      res.status(404).send("User does not exist");
    }
};

const followUser = async (req, res) => {
    const user = await User.findOne({ _id: req.body.id });

    if (user) {
        try{
            res.status(200).send("You are now following "+user.username);
            await User.findByIdAndUpdate(
                req.user._id,
                {
                    $push : { following : user._id}
                },
            )
            await User.findByIdAndUpdate(
                user._id,
                {
                    $push : { followers : req.user._id}
                },
            )
        }catch(e){
            console.error(e);
        } 
    }else {
        res.status(404).send("User does not exist");
    }
}

const uploadProfilePic = async(req,res, next) => {
    const file = req.file;
    if(!file){
        return res.status(400).send(" Please upload a file.")
    }
    try{
        const result = await cloudinary.uploader.upload(file.path);
        console.log(result);
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $push : { profilepic : result.secure_url}
            },
        )
    }
    catch (err) {
        console.log(err);
    }
    next();
};

const logout = (req, res) => {
    res.send("Logged out successfully");
};

module.exports ={
    signup,
    login,
    getProfile,
    updateUser,
    followUser,
    uploadProfilePic,
    logout
}