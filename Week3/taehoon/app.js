const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


const fileRoutes = require('./routes/file');

app.use(bodyParser.json());
app.use('/v1/files', fileRoutes);



app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        message: message
    })
});

app.listen(3000);