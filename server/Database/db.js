const mongoose = require('mongoose')

const Connection =  (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@ecommerce-web.urgvvgi.mongodb.net/test`
    mongoose.connect(URL).then(()=>{
        console.log("Sucessfully Connected with db")
    }).catch((err)=>{
        console.log("Error occured")
        console.log(err)
    })
}



module.exports = Connection