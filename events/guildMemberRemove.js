const db = require("quick.db")
const discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const { MessageAttachment } = require("discord.js")
const Canvas = require('canvas');


module.exports.run = async (client, member) => {
  let canal = db.get(`remchannel_${member.guild.id}`);

  if (canal === null) {
    return;
  }
  let embed = new MessageEmbed()
    const canvas = Canvas.createCanvas(1914, 868);
    const capa = canvas.getContext('2d');
    const fondo = await Canvas.loadImage('https://raw.githubusercontent.com/PabloModoDev/otis_raw_content/main/kts.jpg')
    capa.drawImage(fondo, 0, 0, canvas.width, canvas.height)
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: "png", dynamic: true}));
    capa.drawImage(avatar, 654, 150, 564, 536)
        const attachment = new MessageAttachment(canvas.toBuffer(), 'despedida.webp')
        embed.setDescription(`**${member.user.username} chao**`)
        embed.attachFiles(attachment)
        embed.setImage('attachment://despedida.webp')
        embed.setColor(0x56db00)
        embed.setTimestamp()
        embed.setFooter('Descansa en paz')

  client.channels.cache.get(canal).send(embed);
}