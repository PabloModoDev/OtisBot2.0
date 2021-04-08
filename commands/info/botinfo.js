const { DiscordAPIError } = require("discord.js");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const os = require('os')
const cpuStat = require('cpu-stat')
const si = require('systeminformation');

const moment = require("moment")
module.exports = {
  name: "botinfo",
  aliases: ["stats", "info"],
  usage: "botinfo",
  description: "informacion acerca del bot",
  ownerOnly: true,
  run: async (client, message, args) => {
    cpuStat.usagePercent(function (error, percent, seconds) {
      if (error) {
        return console.error(error)
      }
      const platforma = os.platform()
      const cores = os.cpus().length // Counting how many cores your hosting has.
      const cpuModel = os.cpus()[0].model // Your hosting CPU model.
      const guild = client.guilds.cache.size.toLocaleString()
      const channels = client.channels.cache.size.toLocaleString() // Counting how many servers invite your bot. Tolocalestring, meaning separate 3 numbers with commas.
      const user = client.users.cache.size.toLocaleString() // Counting how many members in the server that invite your bot.
      const usage = formatBytes(process.memoryUsage().heapUsed) // Your memory usage.
      const Node = process.version // Your node version.
      const CPU = percent.toFixed(2) // Your CPU usage.
      
      const embed = new Discord.MessageEmbed() // Stable or < below than 11.x.x use RichEmbed. More than 12.x.x or Master or https://github.com/discordjs/discord.js/ (github:discordjs/discord.js) use MessageEmbed.
      // Actually they are exactly the same.
      const fieldOne = `Servers en donde esta presente:  ${guild} \nUsuarios: ${user}   \nUso de memoria: ${usage} \nNode: ${Node} \nUso de CPU: ${CPU} %`
      embed.addField('**Owner:**', '```pgbito.rar#6755```')
      embed.addField('Estadisticas del bot:', '```'+ fieldOne +'```')
      embed.addField('Escrito en:', '```Javascript - NodeJS```')
      const fieldTwo = ` CPU: ${cores} - ${cpuModel} \nUptime: **${parseDur(client.uptime)}**`
      embed.addField('Estadisticas fisicas:' , '```'+ fieldTwo +'```')
      const fieldThree = `Arquitectura Y OS: Windows 10 Pro ${os.arch()}`
      embed.addField(`Arquitectura Y OS: `, '```'+ fieldThree +'```')
      message.channel.send(embed)
      
    })
  
}
}
function formatBytes (a, b) {
  if (0 == a) return "0 Bytes";
  let c = 1024,
      d = b || 2,
      e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      f = Math.floor(Math.log(a) / Math.log(c));
  
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
} // Create MB, KB, TB or something in the back of your memory counters.

function parseDur(ms) {
  let seconds = ms / 1000,
      days = parseInt(seconds / 86400);
  seconds = seconds % 86400
  
  let hours = parseInt(seconds / 3600);
  seconds = seconds % 3600
  
  let minutes = parseInt(seconds / 60);
  seconds = parseInt(seconds % 60)
  
  if (days) {
    return `${days} day, ${hours} hours, ${minutes} minutes`
  } else if (hours) {
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
  } else if (minutes) {
    return `${minutes} minutos, ${seconds} seconds`
  }
  
  return `${seconds} segundos`
} // Uptime bot.