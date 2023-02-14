const mongoose = require('mongoose');
const User = require('./user');

const History = new mongoose.Schema({
    status: { type: String, require: true },
    approvatedAt: { type: Date, require: true },
    orderId: { type: String, require: true },
    orderName: { type: String, require: true },
    paymentKey: { type: String, require: true },
    totalAmount: { type: Number, require: true },
    userId: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User' }
});

module.exports = mongoose.model('History', History)