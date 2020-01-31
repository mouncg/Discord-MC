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


//Creates the minecraft bot & logs into the server
const bot = mineflayer.createBot({

    host: ip, //You can use "localhost" to connect to a LAN server
    port: port,
    username: user,
    password: pw,
    version: '1.12.2' //You can leave blank to auto-detect, but it only supports 1.12.2 and lower

});


client.on('ready', () => {

    //Sends a message once the bot loads
    //console.log('Successfully loaded...');
    console.log(channel);

});


bot.on('login', () => {

    //Sends a message once the minecraft bot logs into a minecraft server
    console.log(`Connected to ${ip}:${port}`);
    client.channels.get(channel).send(`Connected to ${ip}: ${port}`);

});


bot.on('chat', (player, message) => {

    //This will send an embed to the discord when a player chats
    client.channels.get(channel).send({
        embed: {
            color: 0x00ffff, //You may change this to whatever hex, but make sure you replace "#" with "0x"
            title: playername,
            description: message
        }
    });

    //This will ensure that all players are saved into the json if not already
    var date = new Date();
    date.setMonth(0);

    if (!players[player]) {
        MojangAPI.uuidAt(player, date, function (err, res) {
            if (err)
                console.log(err);
            else
                players[player] = { uuid: res.id, joins: 1, leaves: 0, kills: 0, deaths: 0 }
                fs.writeFile('./players.json', JSON.stringify(client.players, null, 4));
        });
        
    };

});

client.on('message', (message) => {

    var args = message.content.slice(' ');

    //If message is in the desired channel then send to the server
    if (message.channel.id == channel) {
        message.delete();
        bot.chat(`[${message.auhtor.tag}] ${message}`)
    } else {
        //If the message is not in the desired channel, then ignore it
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

