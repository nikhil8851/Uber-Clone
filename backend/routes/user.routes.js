const express = require('express')

const router = express.Router()

const registerUser = require("../controller/user.controller")
const {body} = require('express-validator')

router.post('/register',[
    body('email').isEmail().withMessage("inVailid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage("full must be 3 charachter long"),
    body('password').isLength({min:6}).withMessage("pass must be 6 long charachter")
],
   registerUser.registerUser
)

module.exports = router