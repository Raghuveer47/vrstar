const mongoose = require('mongoose')

const connectdb = async()=>{
    try{
         await mongoose.connect('mongodb+srv://raghuveermustimalla_db_user:2026@cluster0.4xppoji.mongodb.net/?appName=Cluster0')
         console.log("connected db")
    }catch(err){

    }
}

module.exports = connectdb