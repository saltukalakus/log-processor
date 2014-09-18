#!/usr/bin/env node

var amqp = require('amqplib');
var when = require('when');

function msg(exchange, message)
{
    amqp.connect('amqp://localhost').then(function(conn) {
        return when(conn.createChannel().then(function(ch) {

            var ok = ch.assertExchange(exchange, 'fanout', {durable: false});
            return ok.then(function() {
                ch.publish(exchange, '', new Buffer(message));
                return ch.close();
            });
        })).ensure(function() { conn.close(); });
    }).then(null, console.warn);
}

module.exports.msg = msg;