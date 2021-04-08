const { DiscordAPIError } = require("discord.js");
module.exports = {
  name: "np",
  category: "music",
  usage: "np ",
  description: "Sirve para musica lol",
  aliases: ["nowplaying"],


  run: async function (client, message, args) {
  const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send("Tenes que tener una cancion puesta mastodonte");
  const { MessageEmbed } = require ('discord.js')
  const embed = new MessageEmbed()
  .addField(`Esta sonando: **`, `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`)
  return message.channel.send(embed)
}
}