const Discord = require("discord.js")
const db = require("quick.db")
const sendError = require('../../misc/error')
module.exports = {
  name: "setbye",
  category: "moderation",
  usage: "setbye <#channel>",
  description: "Configura el canal de bienvenida",
  run: (client, message, args) => {
    
    let channel = message.mentions.channels.first()
    
    if(!channel) {
      return sendError("Menciona el canal de bienvenida ", message.channel)
    }
    
    //Now we gonna use quick.db
    
    db.set(`remchannel_${message.guild.id}`, channel.id)
    
    message.channel.send(`El canal de bienvenida esta configurado como ${channel}`)
  }
}