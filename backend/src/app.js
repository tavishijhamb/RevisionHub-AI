const express = require("express")
const cors = require("cors")

const uploadRoutes = require("./routes/uploadRoutes")
const generateRoutes = require("./routes/generateRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/", uploadRoutes)
app.use("/", generateRoutes)

module.exports = app