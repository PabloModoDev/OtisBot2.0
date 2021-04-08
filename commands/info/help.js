const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "help",
  description: "w",
  usage: "help <xyz>",
  category: "info",
  cooldown: 2,
  run: async (client, message, args) => {
  const helpj = require('/Users/PCSSD/3D Objects/Otis/misc/help.json')
  const embed = new MessageEmbed()
  const invlink = client.user.id 
  if(message.content == 'ot!help'){     
        embed.setTitle("**:place_of_worship: :place_of_worship: :place_of_worship: :place_of_worship: :place_of_worship: :place_of_worship: :place_of_worship: :place_of_worship: :place_of_worship: :place_of_worship:**")
        embed.setAuthor(message.member.displayName, message.author.displayAvatarURL())
        embed.setDescription(`${helpj.Music} \n ${helpj.Mod} \n ${helpj.NSFW}`) 
        embed.setColor(0x1f7310)
        embed.setThumbnail('https://cdn.discordapp.com/attachments/723244521927999498/723253562288898139/LINEA_DE_COLORES-1-2-1-5.gif')
        embed.setImage('https://raw.githubusercontent.com/PabloModoDev/otis_raw_content/main/help.webp')
        embed.addField("Invite link", `[discord bot invite](https://discord.com/oauth2/authorize?client_id=${invlink}&scope=bot&permissions=2088759031)`)
        message.channel.send(embed);
      }
      if(message.content == 'ot!help nsfw'){
        if (!message.channel.nsfw) return message.channel.send("Please run this command in a NSFW :underage: channel")
        if (message.channel.nsfw) {
        embed.setTitle("**NSFW COMMANDS :underage: **")
        embed.setAuthor(message.member.displayName, message.author.displayAvatarURL())
        embed.setDescription('```'   +` ${helpj.panties} \n ${helpj.cum} \n ${helpj.ass} \n ${helpj.bdsm} \n ${helpj.blowjob} \n ${helpj.doujin} \n ${helpj.feet} \n ${helpj.foxgirl} \n ${helpj.glasses} \n ${helpj.hentai} \n ${helpj.hgifs} \n ${helpj.masturbation} \n ${helpj.maid} \n ${helpj.thighs}` + '```') 
        embed.setColor(0x1f7310)
        embed.setFooter('ot!help nsfw')        
        message.channel.send(embed);
        }
      }
      if(message.content === 'ot!help mod'){
        var txts = [
          '```ot!ban <user> <reason> Ban a member with a reason```',
          '```ot!hackban <user ID> <reason> Ban a user without the user being in the server```'

        ]; 
      }
    }
  }
