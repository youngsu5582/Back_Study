const axios = require('axios');
const CryptoJS = require('crypto-js');

sendMessage = async function (to, orderId, orderName, amount) {
    try{
        const serviceId = process.env.SENS_SERVICE_ID
        const accessKey = process.env.SENS_ACCESS_KEY_ID;
        const secretKey = process.env.SENS_SECRET_KEY;
        const callNumber = process.env.SENS_PHONE_NUMBER;
        const date = Date.now().toString(); 
        var space = " ";
        var newLine = "\n";
        var method = "POST";
        var content = `주문 번호 : ${orderId}\n주문 명 : ${orderName}\n주문 금액 : ${amount}`;
        var url2 = `/sms/v2/services/${serviceId}/messages`;
    
        const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
        hmac.update(method);
        hmac.update(space);
        hmac.update(url2);
        hmac.update(newLine);
        hmac.update(date);
        hmac.update(newLine);
        hmac.update(accessKey);
    
        var hash = hmac.finalize();
        const signature = hash.toString(CryptoJS.enc.Base64);
    
        await axios.post(`https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`,{
                type: "SMS",
                countryCode: "82",
                from: callNumber,
                content: content,
                 messages: [
                {
                    to: '01028187305',
                },
            ]
        },{
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-ncp-iam-access-key": accessKey,
                "x-ncp-apigw-timestamp": date,
                "x-ncp-apigw-signature-v2": signature,
            },
        });
    } catch(err) {
        console.log(err);
    }
}

module.exports = sendMessage;