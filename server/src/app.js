const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
// const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');


const rateLimiter = rateLimit({
    windowMs: 1*60*1000,
    max: 5,
    message: 'too many request from this ip , please try again later',
});

app.use(morgan('dev'));
app.use(rateLimiter);
// app.use(xssClean());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.get('/test',rateLimiter,(req, res) => {
    res.status(200).send({
        message: 'api testing is working',
    });
});

app.get('/api/user', (req, res) => {
    // For GET requests, you should typically use query parameters instead of req.body
    const userId = req.query.id;
    console.log(userId);
    res.status(200).send({
        message: 'user profile is returned',
    });
});

app.use((req, res, next) => {

    next(createError(404, 'route not found'));
});

app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        success: false,
        message: err.message,
    });
});




module.exports = app;