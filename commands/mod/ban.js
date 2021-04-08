const Discord = require('discord.js');
const sendError = require('/Users/PCSSD/Desktop/Otis/misc/error')
module.exports = {
    name: "ban",
    usage: "ban",
    description: "ban",
    category: "mod",
    run: (client, message, args) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!args[0]) return sendError('Necesitas mencionar a un @usuario ', message.channel);
        if(!member.id) return sendError('Uso: '+ prefix +'<user> <reason>`', message.channel);
    
        
    
        if(!member)return sendError("El usuario mencionado no existe o no puede acceder a este canal", message.channel);
        if(!member.bannable) return sendError('No se puede banear el usuario debido a que mi rol esta debajo de el \n o el tiene permisos de administrador', message.channel);
    
    
        let reason = args.slice(1).join(" ");
    
        if(reason === undefined) reason = 'Sin razon especifica';
        
        const BANembed = new Discord.MessageEmbed()
        .setTitle('Miembro baneado')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('Chao', member)
        .addField('Moderador responsable', message.author)
        .setFooter('baneado a las', client.user.displayAvatarURL())
        .setColor(0x1f7310)
        .setTimestamp()
        member.ban({reason: reason}).then(message.channel.send(BANembed)).catch(err => {
            if(err) return message.channel.send(`:sob: ${err}`)
        
        })
        const canal = member.guild.channels.cache.find(c => c.name === "logs");
        
        if(!canal) return;
        if(canal){
        canal.send(`El miembro ${member.user.tag} fue baneado por ${message.author}. Razon: ${reason}`)
        }    
    
    
    }
    
}