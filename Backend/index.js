const a = require('./db');
a();
// connectiion is working 

//installing express 
const express = require('express')
const app = express()
const port = 5000

// use middle ware 
app.use(express.json());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port,()=>{
    console.log(`example app listenting : ${port}`)
}) 