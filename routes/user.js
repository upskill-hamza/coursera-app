const Router = require("express")
const {userModel } = require('../db')
const userRouter = Router();
const jwt = require('jsonwebtoken')
const JWT_USER_PASSWORD = "anything"


userRouter.post("/signup", async function (req, res) {
    const {email, password, firstName, lastName} = req.body  // add zod validation
    // hash the pw so that it is not stored in the plain text in DB
    
    await userModel.create({
        email : email,
        password: password,
        firstName: firstName,
        lastName:lastName
    })

    res.json({ 
        message: "signup succeeded"
    })
})

userRouter.post("/signin", async function (req, res) {

    const {email, password} = req.body

    const user = await userModel.findOne({
        email: email,
        password: password
    })

    if(user){
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD)

        res.json({
            message: "User authenticated",
            token : token
        })
    } else {
        res.status(403).json({
            message: "Unauthorized user"
        })
    }
})

userRouter.get("/purchases", function (req, res) {
    res.json({
        message: "signup endpoint"

    })
})


module.exports = {
    userRouter: userRouter
}