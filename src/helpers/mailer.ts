import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

interface SendEmailParams {
    email: string;
    emailType: 'VERIFY' | 'RESET';
    userId: string | number;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
    try {
        // Validate input data
        if (!userId) {
            throw new Error('UserId is undefined or null');
        }

        // Create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000, // 1 hour
            });
            console.log('Verification token set');
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
            });
            console.log('Reset token set');
        }

        // Configure nodemailer transport
        const transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
            port: Number(process.env.SMTP_PORT) || 2525,
            auth: {
                user: process.env.SMTP_USER || '9dab964cf634f9',
                pass: process.env.SMTP_PASS || 'da4a5e0ae50119',
            },
        });

        const path = emailType  === 'VERIFY' ? 'verifyemail' : 'changepassword';
        const mailOptions = {
            from: process.env.EMAIL_FROM || 'user@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify Your Email' : 'RESET' ? 'Reset Password' : '',
            html: `
                <p>
                Click 
                <a href="${process.env.DOMAIN}/${path}?token=${hashedToken}">here </a> 
                to ${emailType === 'VERIFY' ? 'Verify Your Email' : 'Reset Your Password'}
                or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${path}?token=${hashedToken}
                </p>`,
        };

        const mailResponse = await transport.sendMail(mailOptions);
        console.log('Email sent:', mailResponse);

        return mailResponse;
    } catch (error: any) {
        console.error('Error in mailer file:', error.message);
        throw new Error(`Error in mailer file: ${error.message}`);
    }
};
