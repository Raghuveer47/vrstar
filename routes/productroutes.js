const express = require('express')
const router = express.Router()
const multer = require('multer')
const auth = require('../middleware/authmiddleware')
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


router.get('/products',auth,getall)


module.exports = router