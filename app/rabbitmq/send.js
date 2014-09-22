var amqp = require('amqplib');
var when = require('when');
var config = require('../../config/config');

function msg(q, msg)
{
    amqp.connect('amqp://' + config.rabbitmq_host).then(function(conn) {
        return when(conn.createChannel().then(function(ch) {
            ch.sendToQueue(q, new Buffer(msg));
            return ch.close();

        })).ensure(function() { conn.close(); });
    }).then(null, console.warn);
}

module.exports.msg = msg;
