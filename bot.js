let Discord = require('discord.js');
let logger = require('winston');
let auth = require('./auth.json');

// Configure logger settings.
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize the bot.
let bot = new Discord.Client();

bot.on('ready', () => {
    logger.info(`Logged in as ${bot.user.tag}!`);
});

// Listen for messages.
bot.on('message', message => {
    if (message.content.substring(0, 1) == '!') {
        let args = message.content.substring(1).split(' ');
        let cmd = args[0];

        args = args.splice(1);

        switch (cmd) {
            // !tumblr
            case 'tumblr':
                //
            break;
        }
    }
});

// Connect the bot.
bot.login(auth.token);
