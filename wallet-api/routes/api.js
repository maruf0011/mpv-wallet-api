var express = require('express');
var router = express.Router();
const User = require('../models').user_info;
const Terra = require('../models').terra;

router.post('/sign_up', (req, res) => {
    
    User.create({
        user_name: req.body.user_name,
        password: req.body.password,
        email_address: req.body.email_address,
        is_active: true
    })
    .then(company => {
        Terra.create({
            user_name:  req.body.user_name,
            balance: 100
        })
        .then(response => {
            res.status(200).send({
                success: true
            })
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                error: err
            })
        })
    })
    .catch(err => {
        res.status(500).send({
            success: false,
            error: err
        })
    })
})

router.get('/check_balance/:user_name', (req, res) => {
    
    Terra.findAll({
        where: {
            user_name: req.params.user_name
        }
    })
    .then(result => {
        if(result.length == 0){
            res.status(500).send({
                error: true,
                message: "NO such user"
            });
        }

        else{
            res.status(200).send(result[0])
        }
    })
    .catch(err => {
        res.status(500).send({
            error: true,
            message: err
        })
    })
})

router.get('/login/:user_name/:password', (req, res) => {
    User.findAll({
        where:{
            user_name: req.params.user_name,
            password: req.params.password
        }
    })
    .then(result => {
        if(result.length == 0) {
            res.status(500).send({
                success: false,
                message: "No such matching found"
            })
        }

        else{
            res.status(200).send({
                success: true
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            error: true,
            message: err
        })
    })
})

router.post('/send_money', async(req, res) => {
    var arr = await Terra.findAll({
        where: {
            user_name: req.body.sender_name
        }
    });
    
    if(arr.length == 0)
        res.status(500).send({ error: true, message: "Sender doesn't exist" })

    const sender = arr[0];

    arr = await Terra.findAll({
        where: {
            user_name: req.body.receiver_name
        }
    });

    if(arr.length == 0)
        res.status(500).send({ error: true, message: "Receiver doesn't exist"})

    const receiver = arr[0]

    if(sender["balance"] < req.body.amount)
        res.status(500).send({ error: true, message: "Insufficient balance"})

    else{
        await Terra.update({
            balance: sender["balance"] - parseInt(req.body.amount)
        },
        { where: { user_name: sender["user_name"] }})
        await Terra.update({
            balance: receiver["balance"] + parseInt(req.body.amount)
        },
        { where: { user_name: receiver["user_name"] }})

        res.status(200).send({
            message: "successflully executed"
        });
    }
})

module.exports = router;