const dateformat = require('dateformat');
const Discord = require('discord.js')
module.exports = {
  name: "servericon",
  category: "info",
  usage: "servericon",
  description: "Sirve para musica lo",
  aliases: ["serverimage"],


  run: async function (client, message, args) {
    let icon = message.guild.iconURL({size: 4096, dynamic: true}); // Server Avatar
    
    const embed = new Discord.MessageEmbed()
    .setColor(0x7289DA)
    .setTimestamp(new Date())
    .setAuthor(message.guild.name, icon)
    .setImage(icon)
    message.channel.send(embed); // Let's see if it's working!
  }
}