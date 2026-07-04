const jwt = require('jsonwebtoken')


const auth = async(req,res,next)=>{

    try{

        const token = req.header("Authorization")

        if(!token){
            return res.status(404).json({
                message:"login first"
            })
        }

        const decode = jwt.verify(token,"jwtexample")

       req.user = decode.id
        next();

    }catch(err){

        res.status(500).json({
            message:"invalid token"
        })
    }
}

module.exports = auth