const Discord = require("discord.js")
const db = require("quick.db")


module.exports = {
  name: "despedida",
  category: "moderation",
  usage: "despedida <#channel>",
  description: "Configura el canal de bienvenida",
  run: async (client, message) => {

    let prefix = db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = 'ot!'; 
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    if(message.content == `${prefix}despedida channel`){
      let cName = message.content.split(`${prefix}despedida channel`).join(" ")
      const cSIM = member.guild.channels.cache.find(c => c.name === cName);
      let channel = message.mentions.channels.first() || cSIM
      if(!channel) {
        return message.channel.send(`Menciona un canal valido (Canal de despedida activo ${channel})`)
      }
      db.set(`remchannel_${message.guild.id}`, channel.id)
    
      message.channel.send(`El canal de despedidas esta configurado como ${channel}`)
    }
    if(message.content == `${prefix}despedida message`){
      let cName = message.content.split(`${prefix}despedida message`).join(" ")
      if(!cName) {
        return message.channel.send("Escribe el mensaje despedidas (mensaje actual ")
      }
      db.set(`remessage_${message.guild.id}`, cName)
      
      message.channel.send(`El canal de despedidas esta configurado como ${channel}`)
    }
    if(message.content == `${prefix}despedida image`){
      let cName = message.content.split(`${prefix}despedida image`).join(" ")
      if(!cName) {
        return message.channel.send("Inserta el link de la imagen de la despedida (mensaje actual ")
      }
      db.set(`remph_${message.guild.id}`, cName);
      
      message.channel.send(`El canal de despedidas esta configurado como ${channel}`)
    }
    if(message.content == `${prefix}despedida test`){
    const Canvas = require('canvas');
    let canal = message.channel
    let remph = db.get(`remph_${message.guild.id}`);
    let remsg = db.get(`remessage_${message.guild.id}`);
    let embed = new Discord.MessageEmbed()
    const canvas = Canvas.createCanvas(1914, 868);
    const capa = canvas.getContext('2d');
    const fondo = await Canvas.loadImage(remph)
    capa.drawImage(fondo, 0, 0, canvas.width, canvas.height)
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: "png", dynamic: true}));
    capa.drawImage(avatar, 654, 150, 564, 536)
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'despedida.webp')
        embed.setDescription(`**${member.user.username} ${remsg}**`)
        embed.attachFiles(attachment)
        embed.setImage('attachment://despedida.webp')
        embed.setColor(0x56db00)
        embed.setTimestamp()
        embed.setFooter('Descansa en paz')
      client.channels.cache.get(canal).send(embed);

    }
 
  if(message.content == `${prefix}despedida`){
    const embed = new Discord.MessageEmbed()
    embed.setDescription(`**Introduce una de las siguientes opciones** \n ${prefix}despedida channel <#canal.id | <canal.name> \n ${prefix}despedida message <mensaje de bienvenida> \n ${prefix}despedida image <1920x1080 image URL> \n ${prefix}despedida test`)
    message.channel.send(embed)
 
  
}

    //Now we gonna use quick.db
    

  }
}