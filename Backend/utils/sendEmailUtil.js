const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    console.log({
        h: process.env.SMTP_HOST,
        s: process.env.SMTP_SERVICE
    })
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        service: process.env.SMTP_SERVICE,
        port:465,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD, //app password
        },
    });

    const mailProperties = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailProperties);
};

module.exports = sendEmail;
