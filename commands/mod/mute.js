const { MessageEmbed, Message } = require('discord.js')
exports.run = async (client, message, args) => {
  const ms = require('ms')

    if(message.content.startsWith("ot!mute")){
      if (!message.member.hasPermission("MUTE_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("No tienes permisos para hacer esto");
    }
    
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("Necesitas mencionar a alguien para mutear.");
  
    let role = message.guild.roles.cache.find(r => r.name === "Muted");
    let bot = message.guild.members.cache.get(client.user.id).roles.highest;
    
    if (!role) return message.channel.send("No encuentro el rol `Muted`");
    if (role.position > bot.position) return message.channel.send(`El rol`, `Muted`, ` esta mas arriba de el rol la persona que quieres mutear o el mio`);
    
    let time = args[1];
    
    if (!time) {
      if (user.roles.cache.has(role.id)) return message.channel.send("El usuario ya esta muteado webon");
      await user.roles.add(role.id).catch(err => message.channel.send(`Algo salio mal: ${err}`))
      const muteembed = new MessageEmbed()
      .setAuthor(user.user.tag, user.user.displayAvatarURL())
      .setDescription(`<@${user.user.id}> **esta muteado :mute: :pray:**`)
      
      return message.channel.send(muteembed);
    } else {
      if (user.roles.cache.has(role.id)) return message.channel.send("El usuario ya esta muteado webon.");
      await user.roles.add(role.id).catch(err => message.channel.send(`Algo salio mal: ${err}`))
      message.channel.send(`<@${user.user.id}> **esta muteado :mute: :pray: por ${ms(ms(time), {long: true})}**`);
      
      let timer = setTimeout(function() {
        user.roles.remove(role.id).catch(err => message.channel.send(`Algo salio mal: ${err}`));
        message.channel.send(`<@${user.user.id}> **esta desmuteado :partying_face:**`);
      }, ms(time))
      
      client.mute.set(user.user.id, timer);

    }
  }
}