const mailer = require("nodemailer");

sendMail = async function(to, amount, orderid) {
    const transporter = await mailer.createTransport({
        service: 'naver',
        host: 'smtp.naver.com',
        port: 465,
         auth: {
            user: process.env.NAVER_EMAIL,
            pass: process.env.NAVER_PASSWORD
        },
    });
    
    var mailOptions = {
        from: process.env.NAVER_EMAIL,
        to: to,
        subject: 'Toss Payment Complete! Jaemin',
        html : `<h4>총 금액: ${amount}<h4>
                <h4>주문번호: ${orderid}<h4>` 
    };
    
    await transporter.sendMail(mailOptions, function(err, info) {
        if(err) console.log(err);
    });
}

module.exports = sendMail;