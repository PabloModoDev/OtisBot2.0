const { MessageEmbed } = require("discord.js")
const akaneko = require('akaneko');
exports.run = async (client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send("hay niños cerca shh")
  if (message.channel.nsfw) {
    const cum = ('ricos tutos')
    const embed = new MessageEmbed()
    .setTitle(cum)
    .setColor('RANDOM')
    .setImage(await akaneko.nsfw.thighs())
    .setFooter('powered by akaneko api')
    message.channel.send(embed);
  }
  

};