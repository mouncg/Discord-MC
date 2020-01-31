//Import files & packages
const discord = require('discord.js');
const mineflayer = require('mineflayer');
const client = new Discord.Client({ disableEveryone: true })
const fs = require('fs');
const config = require('./config.json');
const players = require('./players.json');

//Global Variables
var token = config['token'];
var ip = config['ip'];
var port = config['port'];
var user = config['email'];
var pw = config['password'];


//Creates the minecraft bot & logs into the server
const bot = mineflayer.createBot({

    host: ip,
    port: port,
    username: user,
    password: pw,
    version :'1.12.2'//You can change this to anything below 1.12.2, that's currently the highest version mineflayer supports

})

//Sends a message once the bot loads correctly
client.on('ready', () => {

    console.log('Successfully loaded...')

})

client.login(token)

