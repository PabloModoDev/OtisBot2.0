const { MessageEmbed } = require("discord.js")

exports.run = (client, message, args) => {
  if(message.content === ("ot!meme")){
      const got = require('got'),
            {MessageEmbed} = require('discord.js');
      
      got('https://www.reddit.com/r/meme/random/.json').then(response => {
        let content = JSON.parse(response.body),
            image = content[0].data.children[0].data.url,
            embed = new MessageEmbed()
        .setImage(image)
        .setTimestamp()
        .setFooter('memes de redit: r/meme')
        message.channel.send(embed);
      }).catch(console.log)
    }
   

};