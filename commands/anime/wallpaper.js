const Canvas = require('canvas');
const Discord = require('discord.js');

const { MessageEmbed } = require("discord.js")
exports.run = async (client, message) => {
    const hentapi = require('hentapi');
    const embed = new MessageEmbed()
    embed.setImage(hentapi.wallpaper())
    embed.setColor('RED')
    message.channel.send(embed)

}
