const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/user')

router.post('/register', (req, res, next) => {
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password
    })

    user.save()
        .then(result => {
            res.status(201).json({
                message: 'User was created!',
                data: result
            });
        }).catch(err => {
            res.status(500).json({
                error: err
            });
    })
})

module.exports = router;