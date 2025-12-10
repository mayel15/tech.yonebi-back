const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(`Server Started at http://localhost:${process.env.PORT}`)
})

app.get('/', (req, res) => {
    res.send({ message: "Bienvenue dans le serveur de tech-yonebi-back" });
})

app.post('/api/contact', (req, res) => {
    // get the informations of the form
    let clientInformations = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        emailAdress: req.body.emailAdress,
        interestedIn: req.body.interestedIn,
        projectTimeframe: req.body.projectTimeframe,
        message: req.body.message,
    }

    // handle emails
    emailsHandling = {
        botMail: 'botbyndeyaa@gmail.com',
        destinator: 'papemayel1515@gmail.com'
    }

    // body of the mail
    var messageMail = `<strong>Nom:</strong> ${clientInformations.lastName}<br>
    <strong>Prenom</strong>: ${clientInformations.firstName}<br>
    <strong>Numero de telephone:</strong> ${clientInformations.phoneNumber} <br>
    <strong>Email:</strong> ${clientInformations.emailAdress} <br>
    <strong>Interessé par:</strong> ${clientInformations.interestedIn}<br>
    <strong>Durée du projet estimée:</strong> ${clientInformations.projectTimeframe}<br><br><br>
    <strong>Détails:</strong> ${clientInformations.message}<br>`;

    // send the data by email 
    if (!(clientInformations.firstName === ""
        || clientInformations.lastName === ""
        || clientInformations.email === ""
        || clientInformations.phoneNumber === ""
        || clientInformations.message === ""
        || clientInformations.interestedIn.length === 0)) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587, // 587 -> TLS & 465 -> SSL
            auth: {
                // email adress of your google account
                user: emailsHandling.botMail,
                // password of your google account
                pass: 'tnjupodthtykffjx'
            }
        });

        let mail = {
            from: emailsHandling.botMail,
            to: emailsHandling.destinator,
            subject: `Potentiel Client #${clientInformations.lastName}`,
            // we can replace the attribute `text` by `html` if we want that the body of the mail support html syntax
            // html:  '<h1>This email use html</h1>'
            html: `<html>` + messageMail + `</html>`
        };

        transporter.sendMail(mail, (error, info) => {
            if (error) {
                console.log(error);
                res.send({ message: "error" });
            } else {
                console.log('Email: ' + info.response);
                res.send({ message: "mail sent successfully" });
            }
        });
    } else {
        res.send({ message: "an important field is empty !" })
    }

})

app.post('/api/delete-user-data-form', (req, res) => {
    // get the informations of the form
    let clientInformations = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAdress: req.body.emailAdress,
    }

    // handle emails
    emailsHandling = {
        botMail: 'botbyndeyaa@gmail.com',
        destinator: 'papemayel1515@gmail.com'
    }

    // body of the mail
    var messageMail = `<strong>Demande de suppression des données de l'utilisateur</strong><br><br><br>
    <strong>Nom:</strong> ${clientInformations.lastName}<br>
    <strong>Prenom</strong>: ${clientInformations.firstName}<br>
    <strong>Email:</strong> ${clientInformations.emailAdress} <br>`;

    // send the data by email 
    if (!(clientInformations.firstName === ""
        || clientInformations.lastName === ""
        || clientInformations.email === "")) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587, // 587 -> TLS & 465 -> SSL
            auth: {
                // email adress of your google account
                user: emailsHandling.botMail,
                // password of your google account
                pass: 'tnjupodthtykffjx'
            }
        });

        let mail = {
            from: emailsHandling.botMail,
            to: emailsHandling.destinator,
            subject: `GPma - Demande de suppression des données du client #${clientInformations.lastName}`,
            // we can replace the attribute `text` by `html` if we want that the body of the mail support html syntax
            // html:  '<h1>This email use html</h1>'
            html: `<html>` + messageMail + `</html>`
        };

        transporter.sendMail(mail, (error, info) => {
            if (error) {
                console.log(error);
                res.send({ message: "error" });
            } else {
                console.log('Email: ' + info.response);
                res.send({ message: "mail sent successfully" });
            }
        });
    } else {
        res.send({ message: "an important field is empty !" })
    }

})


app.get('/api/send-test-mail-cron-job', (req, res) => {
    // get the informations of the form
    let clientInformations = {
        firstName: "This is a test",
        lastName: "For the cron job",
        phoneNumber: "To see if it works",
        emailAdress: "Or not",
        interestedIn: "Before to do it",
        projectTimeframe: "With notifications",
        message: "in gpma mobile app",
    }

    // handle emails
    emailsHandling = {
        botMail: 'botbyndeyaa@gmail.com',
        destinator: 'papemayel1515@gmail.com'
    }

    // body of the mail
    var messageMail = `<strong>Nom:</strong> ${clientInformations.lastName}<br>
    <strong>Prenom</strong>: ${clientInformations.firstName}<br>
    <strong>Numero de telephone:</strong> ${clientInformations.phoneNumber} <br>
    <strong>Email:</strong> ${clientInformations.emailAdress} <br>
    <strong>Interessé par:</strong> ${clientInformations.interestedIn}<br>
    <strong>Durée du projet estimée:</strong> ${clientInformations.projectTimeframe}<br><br><br>
    <strong>Détails:</strong> ${clientInformations.message}<br>`;

    // send the data by email 
    if (!(clientInformations.firstName === ""
        || clientInformations.lastName === ""
        || clientInformations.email === ""
        || clientInformations.phoneNumber === ""
        || clientInformations.message === ""
        || clientInformations.interestedIn.length === 0)) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587, // 587 -> TLS & 465 -> SSL
            auth: {
                // email adress of your google account
                user: emailsHandling.botMail,
                // password of your google account
                pass: 'tnjupodthtykffjx'
            }
        });

        let mail = {
            from: emailsHandling.botMail,
            to: emailsHandling.destinator,
            subject: `Potentiel Client #${clientInformations.lastName}`,
            // we can replace the attribute `text` by `html` if we want that the body of the mail support html syntax
            // html:  '<h1>This email use html</h1>'
            html: `<html>` + messageMail + `</html>`
        };

        transporter.sendMail(mail, (error, info) => {
            if (error) {
                console.log(error);
                res.send({ message: "error" });
            } else {
                console.log('Email: ' + info.response);
                res.send({ message: "mail sent successfully" });
            }
        });
    } else {
        res.send({ message: "an important field is empty !" })
    }

})