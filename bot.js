let Discord = require('discord.io');
let logger = require('winston');
let auth = require('./auth.json');

console.log('hello');

// Configure logger settings.
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot.
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

// Listen for messages.
bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);

        switch(cmd) {
            // !tumblr
            case 'tumblr':
                //
            break;
        }
    }
});
