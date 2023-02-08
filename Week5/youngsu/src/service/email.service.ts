import nodemailer from 'nodemailer';
import { historyDto } from '../dto/history.dto';
import { Types } from 'mongoose';
import { UserRepository } from '../repository/user.repository';
class EmailService{

    private async sendEmail(id:Types.ObjectId,dto:historyDto){
        const repository = new UserRepository().default;
        const user = await repository.findUserUsingId(id);
        const transport = nodemailer.createTransport({
            service:'gmail',
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            auth:{
                user:process.env.NODEMAILER_EMAIL,
                pass : process.env.NODEMAILER_PASSWORD,
            }
        });
        const info = await transport.sendMail({
            from:'Geumgangville',
            to: user?.email,
            subject:`Toss Payment Complete! ${user?.name}`,
            text : `총금액 : ${dto.totalAmount} \n 주문번호 : ${dto.paymentKey}`
        });
        return info;
    }
    
    
 
get default(){
    return {
        sendEmail:this.sendEmail,
    }
}

}
export default EmailService;