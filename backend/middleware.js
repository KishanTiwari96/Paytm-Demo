const { jwt_secret } = require("./config");
const jwt = require("jsonwebtoken")
function authentication(req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({
            msg:"unauthorized"
        })
    }

    const token = authHeader.split(' ')[1];

    try{
        const decode = jwt.verify(token,jwt_secret);
        if(decode.userId){
            req.userId = decode.userId;
            next(); 
        }else{
            return res.status(400).json({
                msg:"Invalid token"
            })
        }
        
    }catch(e){
        return res.status(400).json({
            msg:"error in authorizing"
        })
    }
    
}


module.exports = {
    authentication
}