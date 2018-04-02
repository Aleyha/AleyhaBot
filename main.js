//3rd party imports
const Discord = require('discord.js');
var fs = require('fs');

//Internal imports
const constants = require('./config/constants/name-constants');
const error_constants = require('./config/constants/error-constants');

//Global vars
var token;

//Initialize Bot
var bot = new Discord.Client();
bot.on('ready', function() {
    console.log(constants.APP_NAME + " ready.");
});

//Handle messages
bot.on('message', (message => {
    if(message.content.startsWith('!')) {
        var requestParams = message.content.split(' ');
        if(requestParams.length <= 0) {
            message.channel.send('I don\'t recognize that command.  Try \'!help\'');
            return console.error(error_constants.INVALID_REQUEST_PARAM);
        }
        request = sanitizeRequest(requestParams[0]);
        switch(request) {
            case('hello'):
                message.channel.send('Hello!');
                break;
            case('time'):
                message.channel.send((new Date()).toString());
                break;
            case('help'):
                message.channel.send(constants.HELP_MSG);
            default:
                console.error(error_constants.INVALID_REQUEST + request);
                break;
        }
    }
}));

function sanitizeRequest(request) {
    if(request.length > 0) {
        return request.slice(1).toLowerCase();
    }
}

//Handle reading auth from other file
fs.readFile(constants.AUTH_FILE, 'utf8', function (err, data) {
    if(err) {
        return console.error(error_constants.FAILED_AUTH_TOKEN);
    }
    token = JSON.parse(data).token;
    bot.login(token);
});
