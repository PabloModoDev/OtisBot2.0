const db = require("quick.db")
const { Util, MessageEmbed } = require("discord.js");
const { support_server, default_prefix } = require("../config.json");
module.exports.run = async (client, message, guild) => {
    const fetch = require('node-fetch')
    
    const logs = await guild.fetchAuditLogs() // fetch guild audit log
    const log = logs.entries.find(l => l.action === "BOT_ADD" && l.target.id === client.user.id) 
    const embed = new MessageEmbed()
    embed.setDescription(`Hey ${log.executor.tag} gracias por añadir a ${client.user.tag} a ${guild.name}`)
    embed.setThumbnail(message.author.displayAvatarURL())
    embed.addField(":green_square:", `[Support server](${support_server})`)
    embed.addField("Prefix:", `'**ot!**'`)
    embed.addField("Ayuda avanzada:" `[Official Web](https://cloudtasks.club)`)
    if(log) log.executor.send(embed)
  

}