const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connect = require('./Scemas/index');
const port = 4000;
const processingRouter = require('./routes/processing');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

connect();

app.use(processingRouter);

app.listen(port, () => console.log(`Sever connected ${port} `));