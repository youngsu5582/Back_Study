const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect('mongodb+srv://jaemin5548:dnwoals1011@study2.999l4bh.mongodb.net/?retryWrites=true&w=majority',)
    .then(() => console.log('MongoDB connect..'))
    .catch(err => console.log(err))
}

mongoose.connection.on('error', (error) => {
    console.error('MongoDB 연결 에러', error);
})

mongoose.connection.on('dsiconnected', () => {
    console.error('MongoDB 연결이 끊김요. 재시도하셈~');
    connect();
})

module.exports = connect;