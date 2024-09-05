// imports
const express = require("express")
const cors = require("cors")
const mainRouter = require("./routes")

const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// routers
app.use("/api/v1", mainRouter)

app.listen(3000, () => {
    console.log("Listening on port 3000")
})