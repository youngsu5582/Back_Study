exports.sendMessage = async (param) => {
    // 수신자 정보 설정
    const user_phone = param.phone;
    const user_name = param.name;
    const user_orderId = param.orderId;
    const user_orderName = param.orderName;
    const user_totalAmount = param.totalAmount;

    // 모듈 설정
    const axios = require('axios');
    const CryptoJS = require('crypto-js');

    // 환경변수
    const serviceId = process.env.SMS_SERVICE_ID;
    const accessKey = process.env.SMS_ACCESS_KEY;
    const secretKey = process.env.SMS_SECRET_KEY;
    const host_phone = process.env.SMS_HOST_PHONE;

    // 암호화, 통신 설정
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
    const url2 = `/sms/v2/services/${serviceId}/messages`;
    const finErrCode = 404;
    const date = Date.now().toString();

    // secretKey 암호화
    // 시그니처 생성 가이드 : https://api.ncloud-docs.com/docs/common-ncpapi
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);

    await axios({
        method: method,
        url: url,
        headers: {
            "Contenc-type": "application/json; charset=utf-8",
            "x-ncp-iam-access-key": accessKey,
            "x-ncp-apigw-timestamp": date,
            "x-ncp-apigw-signature-v2": signature,
        },
        data: {
            type: "SMS",
            countryCode: "82",
            from: host_phone,
            content: `${user_name}님 주문내역\n주문번호: ${user_orderId}\n주문명: ${user_orderName}\n주문금액: ${user_totalAmount}원\n`,
            messages: [
                // 신청자의 전화번호
                { to: `${user_phone}` }],
        },
    }).then(res => {
        console.log(res.data);
    })
        .catch(err => {
            console.log(err);
        })
    return finErrCode;
}