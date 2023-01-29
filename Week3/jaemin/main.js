const express = require('express') // express module
const app = express() // new express app
const port = 4000 // port
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/file');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(fileRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}`))

