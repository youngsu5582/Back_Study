const History = require('../models/history');

exports.addHistory = async (param) => {
    const history = new History({
        status: param.status,
        approvatedAt: param.approvatedAt,
        orderId: param.orderId,
        orderName: param.orderName,
        paymentKey: param.paymentKey,
        totalAmount: param.totalAmount,
        userId: param.userId
    });

    await history.save();
}

exports.getHistoryByUserId = async (param) => {
    return await History.find({ userId: param.userId });
}

exports.getHistoryByPaymentKey = async (param) => {
    return await History.findOne({ paymentKey: param.paymentKey });
}

exports.selectHistory = async () => {
    return await History.find({}).populate('userId');
}

exports.deleteHistory = async () => {
    await History.deleteMany({});
}