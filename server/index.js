const Connection = require("./Database/db")

const bodyParser = require('body-parser')
const cors = require('cors')

const express = require('express')
const app = express()
const router = require('./Routes/routes')

app.use(bodyParser.json({extended : true}))
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())

Connection("user", "ayushprojectsdb")

app.use("/", router)


const PORT = 5000

app.listen(PORT, ()=>{
    console.log(`Listening to ${PORT}`)
})