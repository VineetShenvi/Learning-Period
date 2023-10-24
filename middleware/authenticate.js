const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.TOKEN_SECRET;

const aunthenticateJWT = async(req,res,next)=>{
    try{
        authTokenHeader = req.headers['authorization'];
        if(!authTokenHeader){
            return res.status(401).send("Access denied!");
        }
        const authToken = authTokenHeader.split(" ");
        Token = authToken[1];
        const user = await jwt.verify(Token,process.env.TOKEN_SECRET);
        req.user = user;
        next();
    }catch(err){
        return res.status(400).send(err.message);
    }
}

module.exports = aunthenticateJWT;