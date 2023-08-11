const connectToMongo = require('./db');
connectToMongo();
console.log("connect to mongodb sucessfully");

const express = require('express');
const app = express();
const port = 5000;
app.use(express.json())
// Available Routes 
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// http://localhost:3000/api/auth