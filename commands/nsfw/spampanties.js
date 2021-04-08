 const { MessageEmbed } = require("discord.js")
const akaneko = require('akaneko');
exports.run = async (client, message, args) => {
  if (!message.channel.nsfw) return message.channel.send("hay niños cerca shh")
  function thighs(){
    const embed = new MessageEmbed()    
    const hentapi = require('hentapi');
    embed.setImage(hentapi.nsfw.pantsu())
    embed.setColor('RED')
    message.channel.send(embed)

  }
  thighs()
  thighs()
  thighs()
  thighs()
  

    


  
}

