module.exports = {
  name: "queue",
  description: "w",
  usage: "queue",
  category: "music",
  run: async (client, message, args) => {
  const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send("Esta mas vacio que tu chanchito de ahorros");
  const { MessageEmbed } = require("discord.js");
  const Jimenacierra = new MessageEmbed()
      .setTitle(`__**Playlist ctm:**__`)
      .setDescription(`${serverQueue.songs.map((song) => `**-** ${song.title}`).join("\n")}`)
      .setFooter(`🙏 Esta sonando: ${serverQueue.songs[0].title}`)
      .setColor(0x1f7310)
  

  return message.channel.send(Jimenacierra);
}
}