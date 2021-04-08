const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
    exports.run = (client, message, args) => {

            if(!message.member.hasPermission("BAN_MEMBERS")) {
              return message.channel.send(`**${message.author.username}**, No tienes permisos para desbanear a alguien`)
            }

            if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
              return message.channel.send(`**${message.author.username}**, Otis no tiene permisos`)
            }

            let userID = args[0]
              message.guild.fetchBans().then(bans=> {
              if(bans.size == 0) return 
              let bUser = bans.find(b => b.user.id == userID)
              if(!bUser) return message.channel.send("No hay ningun miembro baneado con este ID")
              message.guild.members.unban(bUser.user)
              const embed1 = new MessageEmbed()
              .setDescription('El miembro ' + `**${bUser.user.tag}**`+ ' fue desbaneado')
              .setColor(0x56db00)             
              
              message.channel.send(embed1)
        }) 

          





    } 



