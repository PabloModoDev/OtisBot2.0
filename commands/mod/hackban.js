const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')

exports.run = async (client, message) => {

        if (!message.member.hasPermission("BAN_MEMBERS")) {
    
            return message.channel.send('No tienes permisos suficientes: \n `BAN_MEMBERS`');
    
        }
        if(message.member.hasPermission("BAN_MEMBERS")){
        const preli = 'ot!hackban'
        const args = message.content.slice(preli.length).split(/ +/);
    
    
    
        const userID = args.join(" ")
        const reason = ' undefined'
    
    
    
        if (!userID) return message.channel.send("Necesitas poner un ID valido para hackbanear");
    
        if (isNaN(userID)) return message.channel.send("El user ID debe de ser un numero");
    
        if (userID === message.author.id) return message.channel.send("Bruh. no te puedes banear a ti mismo maricon");
    
            if (userID === client.user.id) return message.channel.send('otis¡hackban ', client.user.id);
        
    
    
        if (!reason) reason = message.author.tag, 'no reason especified';
        const rq = message.author.tag
        
    
    
        client.users.fetch(userID).then(async user => {
    
            await message.guild.members.ban(user.id, {reason: rq + reason});
            const embed1 = new MessageEmbed()
              .setDescription(`**${user.tag}** fue baneado, fuera del servidor.`)
              .setColor(0x56db00)            
            return message.channel.send(embed1);
    
        }).catch(error => {
    
            // If the user is unavailable, return some errors. (Recommended)
    
            return message.channel.send(`error: **${error}**`);
    
        })
    
    };
}
//.then(user => console.log(`Banned ${user.username || user.id || user} from ${guild.name}`))