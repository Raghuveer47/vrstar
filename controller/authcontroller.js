const User = require('../models/Auth')
const bcrypt = require('bcrypt')



exports.register = async(req,res)=>{

try{

    const existinguser = await User.findOne({
        mail: req.body.mail
    })

    if(existinguser){
        return res.status(400).json({
            message:"user already exists"
        })
    }

    const hashpass = await bcrypt.hash(req.body.password,10)



    const user = await User.create({
        name:req.body.name,
        mail:req.body.mail,
        number:req.body.number,
        password:hashpass
    })

  res.status(200).json({
    message:"regiter done",
    user
  })

}catch(err){
res.status(500).json({
    message:"error",
    err
})
}

}