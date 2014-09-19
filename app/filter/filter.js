var config = require('../../config/config');

function has(str){
    for (var i = 0; i < config.key_words.length; i++){
        var tmp = new RegExp(config.key_words[i], 'i'); // case insensitive search
        if (str.search(tmp) !== -1){
            return 1;
        }
    }
    return 0;
};

module.exports.has = has;
