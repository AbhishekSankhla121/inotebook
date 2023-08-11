const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("connected to mongo successfully");
    } catch (err) {
        console.error("Error connecting to mongo:", err.message);
    }
};

module.exports = connectToMongo;
