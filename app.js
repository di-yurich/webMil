const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const axios = require('axios')
const Card = require('./models/Card')
const rp = require('request-promise')
const nodemailer = require("nodemailer");


const app = express()

app.use(express.json({ extended: true }))

app.use('/api/card', require('./routes/card.routes'))

const PORT = config.get('port') || 5000

async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, ()=> console.log(`App started...`))
           
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()


