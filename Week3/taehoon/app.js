const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const app = express();

const versionRoutes = require('./routes/version');

app.use(bodyParser.json());

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        message: message
    })
});

app.use('/v1', versionRoutes);



sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
