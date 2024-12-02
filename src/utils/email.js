const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

module.exports = {
    sendEmail: (to, subject, text) => {
        return transport.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject,
            text
        });
    },
};