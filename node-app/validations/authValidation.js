const { body } = require("express-validator");
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt')
signUpValidationRules = [
    body('firstName').isString().withMessage('first name must be string'),
    body('lastName').isString().withMessage('last name must be string'),
    body('email').isEmail().withMessage('email is not correct')
        .custom(async (email) => {
            const checkEmail = await userModel.count({
                email: email
            })
            if (checkEmail > 0) {
                throw new Error('user already exist')
            }
            return true
        }),
    body('password').notEmpty().withMessage('New Password is required').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character')
];

logInValidationRules = [
    body('email').isEmail().withMessage('email is not correct')
    .custom(async (email, { req }) => {

        const ccheckEmail = await userModel.count({
            email:email,
        })
        if (ccheckEmail <= 0) {
            throw new Error('User is not exist.')
        }

        return true
    }),

    body('password').notEmpty().withMessage('New Password is required').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character')
]

module.exports = {
    signUpValidationRules,
    logInValidationRules
}

