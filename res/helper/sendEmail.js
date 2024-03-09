const nodemailer = require('nodemailer');

const SendEmail = async (emaillAddress, emailText, emailSubject) => {

    const transporter = nodemailer.createTransport({
        host: 'webhosting2033.is.cc',
        port: 465,
        secure: true,
        auth: {
            user: 'info@binmohammadgroup.com',
            pass: 'Os0!9dEfqxoS'
        }
    })

    let mailOptions = {
        from: 'ToDo App <info@binmohammadgroup.com>',
        to: emaillAddress,
        subject: emailSubject,
        text: emailText
    };


    return await transporter.sendMail(mailOptions);

}

module.exports = SendEmail;