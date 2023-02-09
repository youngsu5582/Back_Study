const express = require('express');
const bodyParser = require('body-Parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
const testRoutes = require('./routes/test');
const paymentRoutes = require('./routes/payment');
const MONGODB_URI =
    'mongodb+srv://tentenball:dlxogns831~@restapi.c89hpnb.mongodb.net/back_study';

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/v1', testRoutes);
app.use(paymentRoutes);
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        message: message
    })
});

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });