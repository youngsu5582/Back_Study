const mongoose = require("mongoose");
const { Schema } = mongoose;

const historySchema = new Schema({
    orderId: String,
    orderName: String,
    paymentKey: String,
    totalAmount: Number,
    status: String,
    approvedAt: Date,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("History", historySchema);