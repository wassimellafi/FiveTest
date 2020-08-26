const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Vote = require('../models/vote')

router.post('/', (req, res, next) => {
    const vote = new Vote({
        _id: mongoose.Types.ObjectId(),
        user: req.body.userId,
        sujet: req.body.sujetId,
        date: new Date()
    })

    vote.save()
        .then(result => {
            res.status(201).json({
                message: 'Item was created!',
                data: result
            });
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        })
})

module.exports = router;