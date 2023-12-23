const mongoose = require('mongoose');
const mongooseURI = "mongodb+srv://abhisheksankhla121:abhishek123@clusterabhishek.mnvmbsw.mongodb.net/"
const connectTOMongo=()=>{
    try {
        mongoose.connect(mongooseURI)
        console.log("connect to mogo sucessfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}
module.exports = connectTOMongo 