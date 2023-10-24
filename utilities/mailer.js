const nodemailer = require("nodemailer")

const sendMail = async (req, res) => {
    const mailTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'river.gutmann@ethereal.email',
            pass: 'YtsJVDdfRsqngc8kSJ'
        }
    });
    
    let details = {
        from : 'River Gutmann" <river.gutmann@ethereal.email>',
        to : "vinshenvi2004@gmail.com",
        subject : "login attempt",
        text : "successful login."
    }
    
    let info = await mailTransporter.sendMail(details);
}

module.exports = sendMail;