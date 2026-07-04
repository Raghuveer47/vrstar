const {register} = require('../controller/authcontroller')
const express = require('express')
const router = express.Router()



router.post('/user/register',register)


module.exports = router

