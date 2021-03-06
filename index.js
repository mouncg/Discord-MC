//Import files & packages
const Discord = require('discord.js');
const mineflayer = require('mineflayer');
const client = new Discord.Client({ disableEveryone: true })
const fs = require('fs');
const config = require('./config.json');
const players = require('./players.json');
var MojangAPI = require('mojang-api');


//Global Variables
var token = config['token'];
var channel = config['channel'];
var ip = config['ip'];
var port = config['port'];
var prefix = config['prefix'];
var user = config['email'];
var pw = config['password'];
var owner = config['owner_id'];


//Creates the minecraft bot & logs into the server
const bot = mineflayer.createBot({

    host: ip, //You can use "localhost" to connect to a LAN server
    port: port,
    username: user,
    password: pw,
    version: '1.12.2' //You can leave blank to auto-detect, but it only supports 1.12.2 and lower

});


client.on('ready', () => {

    console.log('Successfully loaded...');
    console.log(channel);

});


bot.on('login', () => {

    console.log(`Connected to ${ip}:${port}`);
    //client.channels.get(channel).send(`Connected to ${ip}: ${port}`); (not working for some reason)

});


bot.on('chat', (username, message) => {

    client.channels.get(channel).send({
        embed: {
            color: 0x00ffff, //You may change this to whatever hex, but make sure you replace "#" with "0x"
            title: username,
            description: message
        }
    });

    //This will ensure that all players are saved into the json if not already
    //This isn't working at the moment, I'll fix when I can
    var date = new Date();
    date.setMonth(0);

    if (!players[username]) {
        MojangAPI.uuidAt(username, date, function (err, res) {
            if (err)
                console.log(err);
            else
                return
                players[username] = { uuid: res.id, joins: 1, leaves: 0, kills: 0, deaths: 0 };
                fs.writeFile('./players.json', JSON.stringify(client.players, null, 4));
        });
        
    };

});

client.on('message', (message) => {

    var args = message.content.split(' ');
    if (message.author.bot) return;
    var cmd = message.content.slice(args[0].length +1);

    if (args[0] == prefix + 'say') {
        if (message.author.id != owner) {
            message.reply('You do not have permission to run this.')
        } else {
            bot.chat(cmd)
            message.reply(`Successfully sent \`${cmd}\` to the chat.`)
        };
    };

    if (message.channel.id == channel) {
        message.delete();
        bot.chat(`[${message.author.tag}] ${message}`)
    } else {
        return
    };

    if (args[0] == prefix + 'stats') {
        if (!args[1]) return message.reply('Please give me a player name!');

        if (client.players[args[1]]) {
            message.channel.send({
                embed: {
                    color: 0x00ffff,
                    title: `Stats for ${username}`,
                    description: 'Coming Soon!'
                }
            });

        } else {
            message.reply('Please name a valid player!');
        };
        
    };

});


client.login(token);

