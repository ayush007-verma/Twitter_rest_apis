const Connection = require("./Database/db")

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


app.use('/', (req, res) => {
    res.send("Home route working")
})

const PORT = 8000

app.listen(PORT, ()=>{
    console.log(`Listening to {PORT}`)
})