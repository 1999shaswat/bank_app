const express = require("express")
const mongoose = require("mongoose")
const z = require("zod")
const authMiddleware = require("../middleware")
const { Account } = require("../db")
const router = express.Router()

const transferSchema = z.object({
    amount: z.number(),
    to: z.string()
})

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({ userId: req.userId })

    res.json({
        balance: Number(account.balance) / 100
    })
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const { success, data } = transferSchema.safeParse(req.body)
    if (!success)
        return res.status(400).json({
            message: "Incorrect parameters"
        })

    const session = await mongoose.startSession()
    session.startTransaction()

    let { amount, to } = data
    amount *= 100 // Offset by two-places

    const account = Account.findOne({ userId: req.userId }).session(session)

    if (!account || account.balance < amount) {
        await session.abortTransaction()
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = Account.findOne({ userId: to }).session(session)

    if (!toAccount) {
        await session.abortTransaction()
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session)
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session)
    await session.commitTransaction()
    res.json({
        message: "Transfer successful"
    })

})

module.exports = router