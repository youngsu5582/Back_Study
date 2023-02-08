export async function base64Encoding(text:String){
    return Buffer.from(text).toString('base64');
}
