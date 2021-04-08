const db = require("quick.db")
const { default_prefix } = require("../../config.json")
const sendError = require('../../misc/error')
const Discord = require('discord.js')

module.exports = {
  name: "prefix",
  category: "mod",
  usage: "prefix <new-prefix>",
  description: "Change the guild prefix",
  run: async (client, message, args) => {
    //PERMISSION
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return sendError("No tienes permisos suficientes para hacer este comando ('ADMINISTRATOR')",message.channel)
    }
    let prefix = db.get(`prefix_${message.guild.id}`);
    if (prefix === null) prefix = default_prefix; 
    if(!args[0]) {
      return sendError(`Especifica el prefix a cambiar ('${prefix}prefix <simbolo>')`,message.channel)
    } 
    
    if(args[1]) {
      return sendError("El prefix no puede tener espacios",message.channel)
    }
    
    if(args[0].length > 3) {
      return sendError("No puedes hacer un prefix de 3 caracteres",message.channel)
    }
    
    if(args.join("") === default_prefix) {
      db.delete(`prefix_${message.guild.id}`)
     return await message.channel.send("Prefix reseteado ('ot!') ✅")
    }
    
    db.set(`prefix_${message.guild.id}`, args[0])
    const embed = new Discord.MessageEmbed()
    embed.setDescription(`Prefix cambiado a ${args[0]}`)
    embed.setColor('RED')
  await message.channel.send(embed)
    
  }
}