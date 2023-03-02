const mongoose = require('mongoose')
require('dotenv').config();
const db = process.env.DB_NAME

const Connection =  (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@ecommerce-web.urgvvgi.mongodb.net/${db}`
    mongoose.connect(URL).then(()=>{
        console.log("Sucessfully Connected with db")
    }).catch((err)=>{
        console.log("Error occured")
        console.log(err)
    })
}



module.exports = Connection