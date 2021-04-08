const { MessageEmbed } = require("discord.js")

exports.run = (client, message, args) => {
    if(!message.mentions.users.first()){
        const NOADMIN = new MessageEmbed()
        NOADMIN.setDescription('Tu no tienes admin :clown:')
        NOADMIN.setColor('RANDOM')
        const SIADMIN = new MessageEmbed()
        SIADMIN.setDescription('Tienes permiso de admin :n_vibin:')
        SIADMIN.setColor(0x1f7310)
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send(NOADMIN)
        }
        if(message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send(SIADMIN)
        }
      }else{
        const user = message.mentions.users.first()
        const NOADMIN = new MessageEmbed()
        NOADMIN.setDescription(user.tag + ' no tiene admin :clown:')
        NOADMIN.setColor('RANDOM')
        const SIADMIN = new MessageEmbed()
        SIADMIN.setDescription(user.tag +' tiene permiso de admin :n_vibin:')
        SIADMIN.setColor(0x1f7310)
        if(!user.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send(NOADMIN)
        }
        if(user.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send(SIADMIN)
        }
      }
      }


  





