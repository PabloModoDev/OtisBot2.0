const { MessageEmbed } = require("discord.js")
const akaneko = require('akaneko');
exports.run = async (client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send("hay niños cerca shh")
  if (message.channel.nsfw) {
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if(!user) return message.channel.send('Necesitas mencionar a alguien uwu')
    const cum = ('Patas ~/~')
    const embed = new MessageEmbed()
    .setTitle(cum)
    .setColor('RANDOM')
    .setImage(await akaneko.nsfw.feet())
    .setFooter('powered by akaneko api')
    message.channel.send(embed);
  }
  

};