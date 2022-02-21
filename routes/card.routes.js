var express = require('express');
var router = express.Router();
const Card = require('../models/Card')
const axios = require('axios')
const rp = require('request-promise');
const nodemailer = require("nodemailer");
const cron = require('node-cron');
const config = require('config')

router.post('/add-card', async (req, res) => {
    
    try{
        
        const {title, link, id1, id2} = req.body

        const card = new Card({title, link, id1, id2})
        
        await card.save()

        console.log(Card({link}))
        
        res.status(201).json({message: "Об'єкт додано"})


    } catch(e){
        res.status(500).json({message: 'err'})
    }
})


router.post('/send', async (req, res) => {
    
    try{
        const {email, topic, message, stop, time} = req.body
        var scheduleVar = '5 * * * * *'
        const timeNow = Date()
        const t1 = timeNow.split(':')
        switch (time) {
            case '0.10': 
              const result = `${t1[1]%10},${t1[1]%10+10},${t1[1]%10+20},${t1[1]%10+30},${t1[1]%10+40},${t1[1]%10+50}`
              scheduleVar = `${result} * * * *`
              break;
            case '1':
              scheduleVar = `${t1[1]} * * * *`
              break;
            // case '6':
                
            //   break;
            // case '12':
             
            //   break;
            // case '24':
              
            //   break;
            // default:
              
            //   break;
          }
        let transporter = nodemailer.createTransport({
            host: "mail.mil.gov.ua",
            port: 25,
            secure: false, // true for 465, false for other ports
            auth: {
                user: config.get('email'),
                pass: config.get('emailPass'), 
            },
        });
        let mailOptions = {
                    from: '<csoc@mil.gov.ua>', // sender address
                    to: email, // list of receivers
                    subject: topic, // Subject line
                    text: message, // plain text body
            };

        if(!stop){
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error); 
                } else {
                    console.log('Email sent: ' + info.response);
                    res.json({message: `Email sent: ${info.response}`})
                }
            });
            var send = cron.schedule(scheduleVar, () => {
                // Send e-mail
                transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                        console.log(error);
                      } else {
                        console.log('Email sent: ' + info.response);
                        res.json({message: `Email sent: ${info.response}`})
                      }
                  });
                });
            send.start()
        } else {
            send.stop()
            res.json({message: `Service stoped`})
        }       
    } catch(e){
        res.status(500).json({message: 'err'})
    }
})

router.get('/get-card', async (req, res)=>{
    try{
        const cardList = await Card.find()
        res.json(cardList)
    } catch(e){
        res.status(500).json({message: 'Error'})
    }

})

router.post('/get-site/:id', async (req, res)=>{
    try{
        const cardItem = await Card.find({_id: req.body.id})
        rp(cardItem[0].link)
            .then(function(html){
               res.json({message:html})
            })
    } catch(e){
        res.status(500).json({message: 'Error'})
    }

})

router.post('/:id', async (req, res)=>{
    try{
        const cardList = await Card.deleteOne({_id: req.body.id})
        res.json(cardList)
    } catch(e){
        res.status(500).json({message: 'Error'})
    }

})


module.exports = router;