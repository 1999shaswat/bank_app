const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://1999shaswat:Z%5EFjNSfFZuL4q%5E@cluster0.h07p3.mongodb.net/paytm")
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowerCase: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
    },
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: mongoose.SchemaTypes.Number, // Support for two-places precision only
        default: 0,
        required: true
    }
})
const Account = mongoose.model("Account", accountSchema)
const User = mongoose.model("User", userSchema)

module.exports = { User, Account }