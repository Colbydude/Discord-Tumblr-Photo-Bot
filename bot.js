let Discord = require('discord.js');
let logger = require('winston');
let axios = require('axios');

// Configure logger settings.
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize the bot.
let bot = new Discord.Client();

bot.on('ready', () => {
    logger.info('Logged in as ' + bot.user.tag + '!');
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
                axios.get('https://api.tumblr.com/v2/tagged', {
                    params: {
                        api_key: process.env.TUMBLR_API_KEY,
                        limit: 10,
                        tag: args[0]
                    }
                })
                .then(response => {
                    let posts = response.data.response;
                    let post = null;

                    // Go through the posts in the response until we reach a photo post.
                    for (var i = 0; i < posts.length; i++) {
                        if (posts[i].type == 'photo') {
                            post = posts[i];
                            break;
                        }
                    }

                    // If post is still null, show error.
                    if (post == null) {
                        message.channel.send('No photos found for tag: ' + args[0]);
                        logger.warning('No photos found for tag: ' + args[0]);

                        return;
                    }

                    // Otherwise, post the photo.
                    logger.info('Tag: ' + args[0] +', Photo: ' + post.photos[0].original_size.url);
                    message.channel.send(post.photos[0].original_size.url);
                })
                .catch(error => {
                    logger.error(error);
                });
            break;
        }
    }
});

// Connect the bot.
bot.login(process.env.DISCORD_TOKEN);
