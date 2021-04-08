const { DiscordAPIError } = require("discord.js");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const fetch = require('node-fetch')


const moment = require("moment")
exports.run = (client, message, args) => {
if (args.join(" ").length < 1) return message.channel.send("Debes escribir algo");
let permisos = message.channel.permissionsFor(message.member);
      const {body} = fetch('https://some-random-api.ml/animu/pat').then(res => res.json()).then(result => {
      message.channel.send(":)")
      let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
      const hug = (`**${message.member.displayName}**` + ' acaricia suavemente ' + `**${user.displayName}**`)
      const embed = new MessageEmbed()
      .setDescription(hug)
      .setImage(result.link)
      .setColor('RANDOM')
      .setFooter('Powered by some-random-api.ml')
      message.channel.send(embed)
    })
  
}