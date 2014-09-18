'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')();
var config = require('./config/config');
var receive = require('./app/rabbitmq/receive');
var send = require('./app/rabbitmq/send');

/**
 * Main application entry file.
 */
function logMessage(msg) {
    console.log(" [x] '%s'", msg.content.toString());
}

receive.openChannel(config.host, config.rcv_exchange_type, config.rcv_exchange, logMessage);

// Logging initialization

send.msg(config.send_exchange, "Send out a msg");

console.log('Log processor started.');