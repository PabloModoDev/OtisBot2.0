const dateformat = require('dateformat');
const Discord = require('discord.js')
exports.run = (client, message, args) => {

    let icon = message.guild.iconURL({size: 4096, dynamic: true}); // Server Avatar
    
    let region = {
      "brazil": "Brasil",
      "eu-central": "Europa central",
      "singapore": "Singapur",
      "london": "Londres",
      "russia": "Rusia",
      "japan": "Japón",
      "hongkong": "Hongkong",
      "sydney": "Sydney",
      "us-central": "U.S. Central",
      "us-east": "U.S. Este",
      "us-south": "U.S. Sur",
      "us-west": "U.S. Oeste",
      "eu-west": "Europa del oeste"
    }
    
    // Members
    let member = message.guild.members;
    let offline = member.cache.filter(m => m.user.presence.status === "offline").size,
        online = member.cache.filter(m => m.user.presence.status === "online").size,
        idle = member.cache.filter(m => m.user.presence.status === "idle").size,
        dnd = member.cache.filter(m => m.user.presence.status === "dnd").size,
        robot = member.cache.filter(m => m.user.bot).size,
        total = message.guild.memberCount;
    
    // Channels
    let channels = message.guild.channels;
    let text = channels.cache.filter(r => r.type === "text").size,
        vc = channels.cache.filter(r => r.type === "voice").size,
        category = channels.cache.filter(r => r.type === "category").size,
        totalchan = channels.cache.size;
    
    // Region
    let location = region[message.guild.region];
    
    // Date
    let x = Date.now() - message.guild.createdAt;
    let h = Math.floor(x / 86400000) // 86400000, 5 digits-zero.
    let created = dateformat(message.guild.createdAt); // Install "dateformat" first.
    
    const embed = new Discord.MessageEmbed()
    .setColor(0x7289DA)
    .setTimestamp(new Date())
    .setThumbnail(icon)
    .setAuthor(message.guild.name, icon)
    .setDescription(`**ID:** ${message.guild.id}`)
    .addField(":city_dusk: Región", location)
    .addField(":calendar: Creado en", `${created} \nsince **${h}** day(s)`)
    .addField(":crown: Owner", `**${message.guild.owner.user.tag}** \n\`${message.guild.owner.user.id}\``)
    .addField(`:people_hugging: Miembros [${total}]`, `Online: ${online} \nAusentes: ${idle} \nNo molestar: ${dnd} \nOffline: ${offline} \nBots: ${robot}`)
    .addField(`Canales [${totalchan}]`, ` :envelope: Texto: ${text} \n:sound: Voz: ${vc} \n:lock: Categorís: ${category}`)
    message.channel.send(embed); // Let's see if it's working!
  
}