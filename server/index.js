const Connection = require("./db")

const bodyParser = require('body-parser')
const cors = require('cors')

const express = require('express')
const app = express()
const router = require('./routes')

app.use(bodyParser.json({extended : true}))
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())


app.use("/", router)

// app.get("/posts", (req, res) => {
//     res.send("Hello");
// })

Connection("user", "ayushprojectsdb")

const signup = require('./controller/signup')

app.use('/', (req, res) => {
    res.send("Home route working")
})

app.post('/signup', signup)

const PORT = 5000

app.listen(PORT, ()=>{
    console.log(`Listening to ${PORT}`)
})