const cloudinary = require('../config/cloudinary')
const Product = require('../models/Product')



exports.addproduct = async(req,res)=>{
    try{

        const result = await cloudinary.uploader.upload(req.file.path,{
            folder: 'products'
        })
        


        const product = await Product.create({
            pname:req.body.pname,
            price:req.body.price,
            pdesc:req.body.pdesc,
            category: req.body.category,
            image:result.secure_url

        })

        res.status(201).json({
            message:"data added",
            data: product
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

exports.getall = async(req,res)=>{
    try{

        const product = await Product.find()

        res.status(201).json({
            message:"data fetched",
            data: product
        })

    }catch(err){
       
    }
}