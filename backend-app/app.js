const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/users');
const sujetRoutes = require('./routes/sujets');
const voteRoutes = require('./routes/votes');

mongoose.connect('mongodb+srv://wassim_usr:Password1!@cluster0.9icjx.mongodb.net/wass_db?retryWrites=true&w=majority')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => res.send('Main App!'))
app.use('/users', userRoutes);
app.use('/sujets', sujetRoutes);
app.use('/vote', voteRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 400;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        error: {
            message: error.message
        }
    })
})

module.exports = app;