const { MessageEmbed } = require("discord.js")
exports.run = (client, message, args) => {
if (message.content.startsWith('ot!confession')) {

if(message.deletable) message.delete()
if (args.join(" ").length < 1) return message.channel.send("Debes escribir algo");
let permisos = message.channel.permissionsFor(message.member);
const embed = new MessageEmbed()
    .setTitle("Confesion uwu")
    .setDescription(args.join(" "))
    .setColor('RANDOM')
    .setFooter('Confesiones hechas por: Anonimo')
    message.channel.send(embed);
}
};  	


    
  
