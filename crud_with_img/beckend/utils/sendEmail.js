const nodemailer = require("nodemailer")


const sendEmail = async ({to, subject, html, text}) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: Number(process.env.SMTP_PORT) === 465, //true for port 465, false for other ports

            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })

        const mailOptions = {
            from: process.env.SMTP_FROM || `"Support" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
            html,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent:${info.messageId}`);
    return info;
    
    }catch(error){
        console.error(`Error sending email:${error.message}`);
        throw error;


    }

}

module.exports =sendEmai