const Connection = require("./Database/db")

const bodyParser = require('body-parser')

const { authenticate } = require('./controller/auth')
const cors = require('cors')

const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')

const router = require('./Routes/routes')
const userRoutes = require('./Routes/usersRoutes')
const tweetRoutes = require('./Routes/tweetRoutes')

app.use(cookieParser())
app.use(bodyParser.json({extended : true}))
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())

// app.use(authenticate);

Connection("user", "ayushprojectsdb")

app.use("/api/auth", router)
app.use("/api/users", userRoutes)
app.use("/api/tweets", tweetRoutes)


const PORT = 5000

app.listen(PORT, ()=>{
    console.log(`Listening to ${PORT}`)
})