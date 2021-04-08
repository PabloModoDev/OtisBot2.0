const Discord = require('discord.js');

exports.run = (client, message, args) => {
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('No tienes permisos suficientes: \n `BAN_MEMBERS`')
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('Revisa si tengo los siguientes permisos: \n `BAN_MEMBERS``')
    
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!args[0]) return message.channel.send('Como usar a otis bot \n `>kick <user> <reason>`');
        if(member.id === message.author.id) return message.channel.send("Bruh. no te puedes banear a ti mismo maricon");
        if(!member.id) return message.channel.send('Como usar a otis bot \n `>kick  <user> <reason>`');
    
        
    
        if(!member) return message.channel.send("El usuario mencionado no existe o no puede acceder a este canal")
        if(!member.bannable) return message.channel.send('No se puede banear el usuario debido a que mi rol esta debajo de el \n o el tiene permisos de administrador');
    
    
        let reason = args.slice(1).join(" ");
    
        if(reason === undefined) reason = 'Sin razon especifica';
    
        member.kick(reason)
        .catch(err => {
            if(err) return message.channel.send('algo salio mal :sob:')
        })
            
    
        const kickembed = new Discord.MessageEmbed()
        .setTitle('Miembro kickeado')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('Chao', member)
        .addField('Moderador responsable', message.author)
        .setFooter('Kickeado a las', client.user.displayAvatarURL())
        .setColor(0x1f7310)
        .setTimestamp()
    
        message.channel.send(kickembed)
        const canal = member.guild.channels.cache.find(c => c.name === "logs");
        if(!canal) return;
        canal.send(`El miembro ${member} fue kickeado por ${message.author}. Razon: ${reason}`)
    
}
