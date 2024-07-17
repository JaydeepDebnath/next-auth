import User from '@/models/user.models';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email,emailType,userId}:any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {
                    $set:{verifyToken:hashedToken,verifyTokenExpiry:
                        Date.now()+360000}
                });
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,
                {
                    $set:{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:
                        Date.now()+36000000}
                }) 
        }
        let transport = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: process.env.NODEMAILER_PORT,
            auth: {
              user: process.env.NODEMAILER_AUTH_ID,
              pass: process.env.NODEMAILER_AUTH_PASS
            }
          });

        const mailOptions = {
            from:"jaydeepDebnath789@gmail.com",
            to:email,
            subject:emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
        }

        const mailResponse = await transport.sendMail
        (mailOptions)

        return mailResponse;
    } catch (error:any) {
        throw new Error(error.message)
    }
}