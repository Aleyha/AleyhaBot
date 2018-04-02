//3rd party imports
const Discord = require('discord.js');
var fs = require('fs');

//Internal imports
const constants = require('./config/constants/name-constants');

//Global vars
var token;

//Initialize Bot
var bot = new Discord.Client();
bot.on('ready', function() {
    console.log(constants.APP_NAME + " ready.");
});

//Handle messages
bot.on('message', (message => {
    if(message.content.startsWith("hello")) {
        message.channel.send("Hello!");
    } else if(message.content.startsWith("time")) {
        message.channel.send((new Date()).toString());
    }
}));

//Handle reading auth from other file
fs.readFile(constants.AUTH_FILE, 'utf8', function (err, data) {
    if(err) {
        return console.error('Unable to load token from auth.json');
    }
    token = JSON.parse(data).token;
    bot.login(token);
});
