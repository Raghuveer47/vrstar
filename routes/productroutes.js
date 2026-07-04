const express = require('express')
const router = express.Router()
const multer = require('multer')
const {addproduct,getall} = require('../controller/productcontroller')


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

router.post('/products/add',upload.single('image'),addproduct)


router.get('/products',getall)


module.exports = router