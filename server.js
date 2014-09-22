'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')();
var config = require('./config/config');
var receive = require('./app/rabbitmq/receive');
var send = require('./app/rabbitmq/send');
var filter = require('./app/filter/filter');
var mail = require('./app/mail/send');

/**
 * Main application entry file.
 */
function logMessage(msg) {
    //console.log(" [x] '%s'", msg.content.toString());
    if (filter.has(msg.content.toString())) {
        send.msg(config.send_queue_name, msg.content);
    }
}

mail.send();

receive.openChannel(config.host, config.rcv_exchange_type, config.rcv_exchange, logMessage);