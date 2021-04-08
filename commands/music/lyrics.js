const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const fetch = require('node-fetch')
exports.run = (client, message, args) => {
if (args.join(" ").length < 1) return message.channel.send("Debes escribir algo");
let permisos = message.channel.permissionsFor(message.member);
    const {MessageAttachment} = require('discord.js');
    const {body} = fetch('https://some-random-api.ml/lyrics?title=' + args.join(" ")).then(res => res.json()).then(result => {
      message.channel.send(":)")
      const embed = new MessageEmbed()
      .setThumbnail(result.thumbnail.genius)
      .setTitle(result.author)
      .setAuthor(result.title)
      .setDescription(result.lyrics)
      if (embed.description.length >= 2048)
      embed.description = `${embed.description.substr(0, 2045)}...`;
      message.channel.send(embed)
    })
  
}