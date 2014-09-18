#!/usr/bin/env node

var amqp = require('amqplib');

function openChannel(host, exchange_type, exchange, cb)
{
    amqp.connect('amqp://' + host).then(function(conn) {
        process.once('SIGINT', function() { conn.close(); });
        return conn.createChannel().then(function(ch) {
            var ok = ch.assertExchange(exchange, exchange_type, {durable: true });
            ok = ok.then(function() {
                return ch.assertQueue('', {exclusive: true});
            });
            ok = ok.then(function(qok) {
                return ch.bindQueue(qok.queue, exchange, '').then(function() {
                    return qok.queue;
                });
            });
            ok = ok.then(function(queue) {
                return ch.consume(queue, cb, {noAck: true});
            });
            return ok.then(function() {
                console.log(' [*] Waiting for logs. To exit press CTRL+C');
            });
        });
    }).then(null, console.warn);
}

module.exports.openChannel = openChannel;