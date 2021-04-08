const { MessageEmbed } = require("discord.js")
const akaneko = require('akaneko');
module.exports = {
  name: "cum",
  description: "e",
  usage: "cum <estado>",
  category: "utility",
  ownerOnly: true,
  run: async (client, message, args) => {
  if (!message.channel.nsfw) return message.channel.send("hay niños cerca shh")
  if (message.channel.nsfw) {
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if(!user) return message.channel.send('Menciona a alguien ejemplo ot!cum <@usuario>')
    const cum = (`**${message.member.displayName}**` + ' se vino en ' + `**${user.displayName}**`)
    const embed = new MessageEmbed()    
    const hentapi = require('hentapi');
    embed.setTitle(cum)
    embed.setImage(hentapi.nsfw.cum())
    embed.setColor('RED')
    message.channel.send(embed)
  }

    


  
}

}