require('dotenv').config();

const express = require('express');
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log('Connected to Database'))

app.use(express.json())

const resolutionRouter = require('./routes/resolution')
app.use('/resolution', resolutionRouter)

app.get('/ping', (req,res)=>{
    console.log("live")
})

app.listen(5000, ()=> console.log('server started'));