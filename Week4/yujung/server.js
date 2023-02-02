const app = require('./app');
const http = require('http').createServer(app);
require('./database');
require('dotenv').config();


http.listen(process.env.PORT, () => {
    console.log("Server is listeng to port : " + process.env.PORT)
});