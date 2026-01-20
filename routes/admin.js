const Router = require("express")
const adminRouter = Router();
const {adminModel} = require("../db")
const jwt = require('jsonwebtoken')
const JWT_ADMIN_PASSWORD = "yehabhikuchbhi"


adminRouter.post("/signup", async (req, res) => { 
    const {email, password, firstName, lastName} = req.body

    await adminModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })

    res.json({
        message: "Signup endpoint"
    })
})

adminRouter.post("/signin", async (req, res) => { 
    
    const {email, password} = req.body;

    const admin = await adminModel.findOne({
        email: email,
        password: password
    })

    if(admin){
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD)

        res.json({
            token: token
        })
    } else {
        res.json({
            message: "Invalid credentials"
        })
    }

})

adminRouter.post("/course", (req, res) => { 
    
    res.json({
        message: "course endpoint"
    })
})

adminRouter.put("/course", (req, res) => { 
    
    res.json({
        message: "course endpoint"
    })
})

adminRouter.get("/course/bulk", (req, res) => { 
    
    res.json({
        message: "course endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}