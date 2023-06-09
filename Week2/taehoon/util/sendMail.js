const nodemailer = require("nodemailer");

sendMail = async function (to, orderId, totalAmount) {
    const transporter = nodemailer.createTransport({
        service: 'naver',
        host: 'smtp.naver.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    });
    await transporter.sendMail({
        from: `hello ${process.env.NODEMAILER_USER}`,
        to: to,
        subject: 'Toss Payment Successed!',
        text: `총금액 : ${totalAmount}\n 주문번호 : ${orderId}`,
        html: `<span>총금액 : ${totalAmount}<span><br><span>주문번호 : ${orderId}</span>`,
    });
}

module.exports = sendMail;