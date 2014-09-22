var config = require('../../config/config');
var mailer = require('nodemailer');
var fs = require('fs');

function sendMail (){
    // Use Smtp Protocol to send Email
    var smtpTransport = mailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: config.mail_bot,
            pass: config.mail_bot_pass
        }
    });

    console.log(config.mail_attachment_path + config.mail_attachment);

    fs.readFile(config.mail_attachment_path + config.mail_attachment, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }

        var mail = {
            from: "Turksat Log Bot <from@gmail.com>",
            to: config.send_mail_to,
            subject: config.mail_subject,
            text: config.mail_text,
            html: config.mail_html,
            attachments : [{'filename': config.mail_attachment,'contents':data}]
        };

        smtpTransport.sendMail(mail, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log("Message sent: " + response.message);
            }

            smtpTransport.close();
        });
    });
}

module.exports.send = sendMail;