const mongoose = require('mongoose')

const Connection =  (username, password) => {
    mongoose.connect(`mongodb+srv://${username}:${password}@ecommerce-web.urgvvgi.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
        console.log("Sucessfully Connected with db")
    }).catch((err)=>{
        console.log("Error occured")
        console.log(err)
    })
}


module.exports = Connection