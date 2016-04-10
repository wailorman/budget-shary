"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const corsMiddleware = require('./middlewares/cors');

app.use(corsMiddleware);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/ping', (req, res)=> {

    res.send('Pong');

});

app.listen(8050, function () {
    console.log(`server started`);
    console.log(`production: ${process.env.NODE_ENV ? 'yes' : 'no'}`);
});