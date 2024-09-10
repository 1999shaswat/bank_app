const express = require("express")
const z = require("zod")
const { User, Account } = require("../db")
const router = express.Router()
const jwt = require("jsonwebtoken")
const argon2 = require("argon2")
const authMiddleware = require("../middleware")
const JWT_SECRET = require("../config")

const signupSchema = z.object({
    username: z.string().email().min(3).max(30),
    password: z.string().min(6),
    firstName: z.string().max(30),
    lastName: z.string().max(30),
})

const updateSchema = z.object({
    password: z.string().min(6).optional(),
    firstName: z.string().max(30).optional(),
    lastName: z.string().max(30).optional(),
})

// Me (token validation)
router.get("/me", authMiddleware, async (req, res) => {

    const existingUser = await User.findById(req.userId)
    if (!existingUser)
        return res.status(400).json({ message: "Error while logging in" })

    const responseUser = { firstName: existingUser.firstName, lastName: existingUser.lastName }

    return res.json({
        msg: "Authentication Successful",
        tokenValid: true,
        user: responseUser
    })
})

// Signup
router.post("/signup", async (req, res) => {
    const { success } = signupSchema.safeParse(req.body)
    if (!success)
        return res.status(400).json({ message: "Incorrect inputs" })

    const existingUser = await User.findOne({ username: req.body.username })
    if (existingUser)
        return res.status(400).json({ message: "Email already taken" })

    const { password } = req.body
    const hashedPassword = await argon2.hash(password)
    req.body.password = hashedPassword

    const user = await User.create(req.body)

    const responseUser = { firstName: user.firstName, lastName: user.lastName }

    const userId = user._id

    await Account.create({
        userId,
        balance: parseInt((1 + Math.random()) * 10000000) // Random balance
    })

    const token = jwt.sign({ userId: user._id }, JWT_SECRET)

    return res.status(200).json({
        message: "User created successfully",
        token,
        user: responseUser
    })
})

// Signin
router.post("/signin", async (req, res) => {
    const existingUser = await User.findOne({
        username: req.body.username || ""
    })

    if (!existingUser)
        return res.status(400).json({ message: "Error while logging in" })

    const { password } = req.body
    const verified = await argon2.verify(existingUser.password, password)

    if (!verified)
        return res.status(400).json({ message: "Error while logging in" })

    const responseUser = { firstName: existingUser.firstName, lastName: existingUser.lastName }

    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET)
    return res.status(200).json({
        token,
        user: responseUser
    })
})

// Update user details
router.put("/", authMiddleware, async (req, res) => {
    const { success, data } = updateSchema.safeParse(userObj)
    if (!success)
        return res.status(400).json({ message: "Error while updating information" })

    const hash = argon2.hash(data.password)
    data.password = hash

    const user = await User.findByIdAndUpdate(req.userId, { $set: data })
    const responseUser = { firstName: user.firstName, lastName: user.lastName }

    return res.status(200).json({
        message: "Updated successfully",
        user: responseUser
    })
})

// Search user
router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || ""
    let users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    }, 'username firstName lastName _id')
    // const users = await User.find({ $or: [{ firstName: filter }, { lastName: filter }] }, 'username firstName lastName _id') //.exec() required or not

    users = users.filter((user) => user._id != req.userId) // removes the requesting user from the results

    return res.status(200).json({ users })
})

module.exports = router