const mongoose = require("mongoose")

async function mongodbConnect(url){
    return mongoose.connect(url).then(()=>console.log("Mongodb Connected..."))
}


module.exports = { mongodbConnect }