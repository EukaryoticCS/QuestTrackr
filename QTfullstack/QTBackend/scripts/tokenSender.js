import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

let testAccount = await nodemailer.createTestAccount();

let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
    },
});

const token = jwt.sign({ data: 'Token Data' }, 'ourSecretKey', { expiresIn: '30m' })

const mailConfiguration = {
    from: 'questtrackr@gmail.com',
    to: 'bssmith2021@gmail.com',
    subject: 'Welcome to QuestTrackr!',
    text: `Hello! Welcome to QuestTrackr, the video game completion tracker of the future!\n
    Please follow this link to verify your email: http://localhost:5000/verify/${token}`
}

transporter.sendMail(mailConfiguration, function(error, info) {
    if (error) {
        console.log("Error sending email: " + error.message)
    } else {
        console.log("Email sent successfully!")
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        console.log(info)
    }
})