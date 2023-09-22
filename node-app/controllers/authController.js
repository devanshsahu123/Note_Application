const userModel = require("../models/userModel.js")
const { StatusCodes } = require("http-status-codes")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
class authController {

    static signUpController = async (req, res) => {
        try {

            const { firstName, lastName, email, password } = req.body;
            console.log("first", firstName, lastName, email, password);
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)

            const createUser = await userModel.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashPassword,
            })
            return res.status(StatusCodes.ACCEPTED).send({ status: true, msg: "Register successfully", });
        } catch (error) {
            console.log(error)
            return res.status(StatusCodes.BAD_REQUEST).send({ status: false, msg: error.message })
        }
    }

    static logInController = async (req, res) => {
        try {
            const { email, password } = req.body;

            const checkUser = await userModel.findOne({
                email: email
            }).select('_id email password');

            const checkPassword = await bcrypt.compare(password, checkUser.password)
            if (!checkPassword) {
                throw new Error('Wrong Password !!')
            }

            const createJWT = await jwt.sign({ _id:checkUser._id,email:checkUser.email }, process.env.JWT_SECRET_KEY)
            
            return res.status(StatusCodes.ACCEPTED).send({ status: false, msg: "login", token: createJWT })
        } catch (error) {
            console.log(error)
            return res.status(StatusCodes.BAD_REQUEST).send({ status: false, msg: error.message })
        }
    }
}

module.exports = authController;