const nhentai = require('nhentai');
const api = new nhentai.API();
const { MessageEmbed } = require("discord.js")
const embed = new MessageEmbed()
const fetchDoujin = require('node-fetch')
module.exports = {
    name: "nhentai",
    description: "nhentai",
    usage: "nhentai <code>",
    category: "nsfw",
    run: async (client, message, args) => {
const careta = args.join(' ')
if (!careta) return message.channel.send('Tienes que poner un codigo h')
if(isNaN(careta))return message.channel.send('El codigo tiene que ser un numero ejemplo "ot!nhentai 346203"')

if (careta < 1) return message.reply('El codigo es muy corto');
api.fetchDoujin(careta).then(doujin => {
    // Keijun Yahagi wa Koi o Shita. Jou | Light Cruiser Yahagi Fell In Love - First
    doujin.titles.pretty;

    // https://i.nhentai.net/galleries/1767063/1.jpg
    doujin.pages[0].url;

    // https://t.nhentai.net/galleries/1767063/cover.jpg
    doujin.cover.url;

    // english, translated, kantai collection, teitoku, yahagi, rosapersica, [etc...]
    doujin.tags.map(tag => tag.name).join(', ');
    embed.setTitle(doujin.titles.pretty)
    embed.setImage(doujin.cover.url)
    embed.addField(`https://i.nhentai.net/g/${careta}`, `**${doujin.tags.map(tag => tag.name)}**`)
    embed.setDescription('oruga')
    message.channel.send(embed)
})
}
}