const { MessageEmbed } = require("discord.js")
const akaneko = require('akaneko');
exports.run = async (client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send("hay niños cerca shh")
  if (message.channel.nsfw) {
    const cum = ('Random hentai for you')
    const embed = new MessageEmbed()
    .setTitle(cum)
    .setColor('RANDOM')
    .setImage(await akaneko.nsfw.hentai())
    .setFooter('powered by akaneko api')
    message.channel.send(embed);
  }
  

};