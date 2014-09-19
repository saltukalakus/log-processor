'use strict';

module.exports = {
    rcv_exchange_type : 'fanout',
    send_queue_name: 'my_processed_logs',
    key_words: ['error', 'warning', 'mozilla']
};