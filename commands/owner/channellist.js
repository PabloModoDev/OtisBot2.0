const { MessageEmbed } = require("discord.js")
const akaneko = require('akaneko');
exports.run = async (client, message, args) => {
    const embed = new MessageEmbed()
    .setFooter('powered by akaneko api')
    message.channel.send(embed)
    .then(console.log)
    .catch(console.error);
    
 
  

};
