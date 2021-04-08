const { MessageEmbed } = require("discord.js")
const akaneko = require('akaneko');
const hentapi = require('hentapi')
exports.run = (client, message, args) => {
  if (!message.channel.nsfw) return message.channel.send("hay niños cerca shh")
  async function thighs(){
    const embed = new MessageEmbed()    
    embed.setImage(await akaneko.nsfw.feet())
    embed.setColor('RED')
    message.channel.send(embed)

  }
  thighs()
  thighs()
  thighs()
  thighs()
  

    


  
}

