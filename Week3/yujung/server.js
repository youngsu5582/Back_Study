const app = require('./app');
const http = require('http').createServer(app);
require('dotenv').config();

http.listen(process.env.PORT, () => {
    console.log('Server is listening to port: ' + process.env.PORT);
})