import crypto from 'crypto';
export async    function makeSignature() {
    const space = " ";
    const newLine = "\n";
    const message = [];
    const hmac = crypto.createHmac("sha256", process.env.NCLOUD_SECRET_KEY!);
    const url2 = `/sms/v2/services/${process.env.NCLOUD_SERVICE_KEY}/messages`;
    const timestamp = Date.now().toString();

    message.push('POST');
    message.push(space);
    message.push(url2);
    message.push(newLine);
    message.push(timestamp);
    message.push(newLine);
    message.push(process.env.NCLOUD_ACCESS_KEY!);

    const signature = hmac.update(message.join("")).digest("base64");

    return {
      timestamp,
      signature,
    };
  }