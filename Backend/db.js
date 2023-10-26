const mongoose = require('mongoose');
const mongooseURI = "mongodb://127.0.0.1:27017/practice"
const connectTOMongo=()=>{
    try {
        mongoose.connect(mongooseURI)
        console.log("connect to mogo sucessfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}
module.exports = connectTOMongo 