require("dotenv").config();

exports.sendEmail = async (param) => {
    // 송신자 정보
    const host_email = process.env.NODEMAILER_HOST_EMAIL;
    const host_password = process.env.NODEMAILER_HOST_PASSWORD;
    const host_name = process.env.NODEMAILER_HOST_NAME;

    // 수신자 정보
    const user_email = param.email;
    const user_totalAmount = param.totalAmount;
    const user_orderId = param.orderId;


    // nodemailer 모듈
    const nodemailer = require('nodemailer');

    // 메일 송신 정보 설정
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: host_email,
            pass: host_password,
        },
    });

    // 메일 송신
    await transporter.sendMail({
        from: host_email,
        to: user_email,
        subject: `[${host_name}] 결제완료되었습니다.`,
        html: `
        <p>총 금액 : ${user_totalAmount}원</p>
        <p>주문번호 : ${user_orderId}</p>
        `,
    });
}