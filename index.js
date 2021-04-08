const { token } = require("./config.json");
const discord = require("discord.js"); 
const client = new discord.Client({
  disableEveryone: true,  ws: { properties: { $browser: "Discord Android" }} 
});
client.queue = new Map(); 
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});



client.login(token);