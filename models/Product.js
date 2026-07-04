const mongoose = require('mongoose')


const productdetails = new mongoose.Schema
({
    pname:{
        type:String,

    },
    price:{
        type:Number
    },
    pdesc:{
        type:String
    },
    category:{
        type:String
    },
    image:{
        type:String
    }
})

module.exports = mongoose.model('Product',productdetails)