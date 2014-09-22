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
    mail_subject: 'ATS\'de bir sorun oluştu.',
    mail_text: 'Lütfen ekteki log dosyasını inceleyin.',
    mail_html: '<b>Lütfen ekteki log dosyasını inceleyin.</b>',
    mail_attachment: 'log.txt',
    mail_queue_wait: 60, //Number of seconds logs are queued before sending mails.
    mail_send_to: ['saltukalakus@gmail.com', 'ralakus@turksat.com.tr'],

    //Log Processor behavioral settings
    can_send_mail: true,
    can_push_data_to_elastic: true
};