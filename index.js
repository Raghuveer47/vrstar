const express = require('express')
const app = express()
const Product = require('./models/Product')
const productroute = require('./routes/productroutes')
const connectdb = require('./config/db')
const userRoutes = require('./routes/authroute')


app.use(express.json())
app.use("/uploads",express.static("uploads"))



connectdb()


app.use('/v1',productroute)




app.get('/',(req,res)=>{
   res.end('service is running')

})

app.use('/v1',userRoutes)






//post data



//get all the data



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