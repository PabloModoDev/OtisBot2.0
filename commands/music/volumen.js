const { MessageEmbed } = require('discord.js')
const embed = new MessageEmbed()
exports.run = (client, message, args) => {
  const { channel } = message.member.voice;
  const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue){
    embed.setDescription("Tienes que tener una cancion puesta para cambiar el volumen")
    embed.setColor(0x188f46)

    return message.channel.send(embed); 
  }
  if (!channel){
    embed.setDescription("Necesitas estar en un canal de voz para usar este comando")
    embed.setColor(0x188f46)
    return message.channel.send(embed)
      
  };
  
  
  if (!args[0]){
    embed.setDescription(`El volumen esta en: **${serverQueue.volume}**`)
    embed.setColor(0x188f46)

    return message.channel.send(embed); 
  }
  serverQueue.volume = args[0]; 
  serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5)
      embed.setDescription(`Le cambie el volumen a: **${args[0]}** `)
      embed.setColor(0x188f46)

  return message.channel.send(embed);
};
