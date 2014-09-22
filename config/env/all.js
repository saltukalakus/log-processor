'use strict';

module.exports = {
    //RabbitMq settings
    rcv_exchange_type : 'fanout',
    send_queue_name: 'my_processed_logs',

    //Keyword list to filter logs with
    key_words: ['error', 'warning', 'mozilla'],

    //Mail settings
    mail_bot: 'turksatlogbot@gmail.com',
    mail_bot_pass: process.env.CLP_MAIL_PASS,
    mail_subject: 'ATS\'de enteresan bir durum oluştu.',
    mail_text: 'Lütfen ekteki log dosyasını inceleyin.',
    mail_html: '<b>Lütfen ekteki log dosyasını inceleyin.</b>',
    mail_attachment_path: './',
    mail_attachment: 'logs.txt',
    send_mail_to: ['saltukalakus@gmail.com', 'ralakus@turksat.com.tr']
};