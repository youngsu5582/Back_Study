const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const historySchema = new Schema({
    status: {
        type: String,
        required: true
    },
    provatedAt: {
        type: Date,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    orderName: {
        type: String,
        required: true
    },
    paymentKey: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('History', historySchema);