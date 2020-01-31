//Import files & packages
const discord = require('discord.js');
const mineflayer = require('mineflayer');
const client = new Discord.Client({ disableEveryone: true })
const fs = require('fs');
const config = require('./config.json');
const players = require('./players.json');

//Global Variables
var token = config['token'];
var channel = config['channel'];
var ip = config['ip'];
var port = config['port'];
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

    //Sends a message once the bot loads correctly
    console.log('Successfully loaded...');

})


bot.on('login', () => {

    //Sends a message once the minecraft bot logs into a minecraft server
    console.log(`Connected to ${ip}:${port}`);
    client.channels.get(channel).send(`Connected to ${ip}: ${port}`);

});


client.login(token);

