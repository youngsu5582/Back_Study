require('dotenv').config();
const { SolapiMessageService } = require('solapi');
const messageService = new SolapiMessageService(process.env.SOLAPI_KEY, process.env.SOLAPI_SECRET_KEY);

const sendSMS = async function (phone_number, orderId, orderName, totalAmount) {
    await messageService.send({
        "to": phone_number,
        "from": process.env.SOLAPI_NUMBER,
        "text": `주문번호 : ${orderId}\n 주문 명 : ${orderName}\n 주문금액 : ${totalAmount}`,
    });
}

module.exports = sendSMS;