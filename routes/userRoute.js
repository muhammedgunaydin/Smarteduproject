const express = require('express')
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')
const { body } = require('express-validator');
const user = require('../models/User');
const User = require('../models/User');
const { promise } = require('bcrypt/promises');

const router = express.Router()

router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Please enter your name'),


        body('email').isEmail().withMessage('Please enter valid email')
        .custom((userEmail)=>{
            return User.findOne({email:userEmail}).then(user=>{
                if (user){
                    return Promise.reject('Email is already exists!')
                }
            })
        }),



        body('password').not().isEmpty().withMessage('Please enter a password'),
    ],
    
    authController.createUser)
router.route('/login').post(authController.loginUser)
router.route('/logout').get(authController.logoutUser)
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage)

module.exports = router