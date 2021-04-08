const { MessageEmbed, MessageAttachment } = require('discord.js')
exports.run = async (client, message, args) => {
let link = `https://some-random-api.ml/canvas/wasted/?avatar=${message.author.avatarURL({ format: 'png'})}`
const attachment = new MessageAttachment(link, 'wasted.png');
  const embed = new MessageEmbed()
    .setTitle(`:flag_cc:`)
    .attachFiles(attachment)
    .setImage('attachment://wasted.png')
  message.channel.send(embed)
}   