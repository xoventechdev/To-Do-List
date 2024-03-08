const express = require('express');
const cors = require('cors')
const hpp = require('hpp');
const helmet = require('helmet');
const router = require('./res/routes/api');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();

app.use(cors())
app.use(hpp())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());



app.use('/api/v1',router);

mongoose.connect('mongodb+srv://minbarapps:minbarapps@todo.jveh43o.mongodb.net/todo').then(()=>{
    console.log('Connected to MongoDB');
})


module.exports = app;