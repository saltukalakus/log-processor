var config = require('../../config/config');
var mailer = require('nodemailer');
var fs = require('fs');

var attachment = [];
var send_trigger = false;

function sendMail (data) {
    if (send_trigger == false)
    {
        attachment = [];
        send_trigger = true;
        setTimeout(send, config.mail_queue_wait * 1000);
    }
    attachment.push(data);
}

function send(){
    send_trigger = false;

    // Use Smtp Protocol to send Email
    var smtpTransport = mailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: config.mail_bot,
            pass: config.mail_bot_pass
        }
    });

    var mail = {
        from: "Turksat Log Bot <from@gmail.com>",
        to: config.send_mail_to,
        subject: config.mail_subject,
        text: config.mail_text,
        html: config.mail_html,
        attachments : [{'filename': config.mail_attachment,'contents':attachment.join('\n')}]
    };

    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }

        smtpTransport.close();
    });
}

module.exports.send = sendMail;