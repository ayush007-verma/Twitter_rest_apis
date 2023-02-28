const Connection = require("./db")

const bodyParser = require('body-parser')
const cors = require('cors')

const express = require('express')
const app = express()

app.use(bodyParser.json({extended : true}))
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())

Connection("user", "ayushprojectsdb")


app.use('/', (req, res) => {
    res.send("Home route working")
})

const PORT = 8000

app.listen(PORT, ()=>{
    console.log(`Listening to {PORT}`)
})