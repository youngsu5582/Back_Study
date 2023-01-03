import jwt from 'jsonwebtoken';
export async function decode(token : string){
    const secret = process.env.SECRET||'Random_Secret_Hash_x*nd23';
    return jwt.verify(token,secret);
}
export async function encode(email:string){
    const secret = process.env.SECRET||'Random_Secret_Hash_x*nd23';
    return jwt.sign(email,secret);
}