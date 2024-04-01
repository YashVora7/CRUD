const mongoose = require("mongoose")

const connect = async ()=>{
    await mongoose.connect("mongodb+srv://YashVora:vora@cluster0.pndil4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Connected to MongoDB");
}

module.exports = connect