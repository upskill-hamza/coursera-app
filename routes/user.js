const Router = require("express")
const {userModel, purchaseModel, courseModel } = require('../db')
const userRouter = Router();
const  {JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");

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

userRouter.get("/purchases", userMiddleware, async function (req, res) {

    const userId = req.userId

    const purchases = await purchaseModel.find({
        userId
    })

    // let purchasedCourseIds = []

    // for (let i = 0; i < purhcases.length; i++) {
    //     purchasedCourseIds.push(purchases[i].courseId)
        
    // }
    // const coursesData = await courseModel.find({
    //     _id : {$in: purchasedCourseIds}
    // })

    const coursesData = await courseModel.find({
        _id : {
            $in: purchases.map(x => x.courseId)
        }
    })


    res.json({
        purchases,
        coursesData
    })
})


module.exports = {
    userRouter: userRouter
}