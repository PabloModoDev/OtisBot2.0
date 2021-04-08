
const sendError = require('../../misc/error')
const config = require('../../config.json')
const hemtai = require('hmtai');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "eval",
  description: "e",
  usage: "eval <estado>",
  category: "owner",
  ownerOnly: true,
  run: async (client, message, args) => {
    const code = args.join(" "); 
        if(!code){
          return sendError('Ocupas poner un string de codigo lol ',message.channel)
        }
    function clean(text) {
      if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
          return text;
    }
      try {
        
        let evaled = eval(code);
   
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
          let embed = new MessageEmbed()
          embed.setTitle('output')
          embed.setDescription('```' +clean(evaled)+ '```')
          embed.setColor('BLUE')
          message.channel.send(embed);
        } catch (err) {
        message.channel.send({ embed: { description: `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``, color: 'RED' } });
      }
    }
  }