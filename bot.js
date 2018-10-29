const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const bot = new Discord.Client({});

bot.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);

    let jsfile = files.filter(f => f.split(".").pop() == 'js');
    
    if (jsfile.length <= 0) { return console.log('No JavaScript file containing a command was found.') }
    else { console.log(`${jsfile.length} commands found.`) };

    jsfile.forEach((f,i) => {
        let command = require(`./commands/${f}`);
        console.log(`Command: ${f} loaded successfully!`);
        bot.commands.set(command.config.command, command);
    })
});

bot.on('ready', () => {
    console.log('ready.');
});

bot.on('error', console.error);

bot.on('message', async (msg) => {
    const prefix = '>';
    let command = ((msg.content.split(" "))[0]).replace(prefix, '');
    let args = msg.content.split(" ").slice(1);

    let cont = msg.content.slice(prefix.length).split(" ");
    if (!msg.content.startsWith(prefix)) return;
    
    let cmd = bot.commands.get(cont[0]);
    if (cmd) cmd.run(bot, msg, args);
});

bot.login(process.env.BOT_TOKEN);
