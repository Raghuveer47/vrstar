const express = require('express')
const app = express()
const Product = require('./models/Product')
const multer = require('multer')
const connectdb = require('./config/db')
const cloudinary = require('./config/cloudinary')


connectdb()




app.use(express.json())
app.use("/uploads",express.static("uploads"))

app.get('/',(req,res)=>{
   res.end('service is running')

})

//multer
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads');
    },

    filename: function(req,file,cb){
        cb(null,Date.now() + '-'+ file.originalname)
    }
})

const upload = multer({
    storage :storage
})


//post data
app.post('/products/add',upload.single('image'),async(req,res)=>{
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
})


//get all the data
app.get('/products',async(req,res)=>{
    try{

        const product = await Product.find()

        res.status(201).json({
            message:"data fetched",
            data: product
        })

    }catch(err){
       
    }
})


//get by id
app.get('/products/:id',async(req,res)=>{
    try{

        const product = await Product.findById(req.params.id)

        res.status(201).json({
            message:"data fetched",
            data: product
        })

    }catch(err){
       
    }
})


//update
app.put('/products/:id',async(req,res)=>{
    try{

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        res.status(201).json({
            message:"data fetched",
            data: product
        })

    }catch(err){
       
    }
})


//delete
app.delete('/products/:id',async(req,res)=>{
    try{

        const product = await Product.findByIdAndDelete(req.params.id)
        

        res.status(201).json({
            message:"data deleted",
           
        })

    }catch(err){
       
    }
})



app.listen(5001,()=>{
    console.log('server started')
})