const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "invite",
  description: "w",
  usage: "invite <xyz>",
  category: "info",
  cooldown: 2,
  run: async (client, message, args) => {
  const invlink = client.user.id
    const embed = new MessageEmbed()
    .setTitle("**This is my invite link// Este es mi link de invite**")
    .setAuthor(message.member.displayName, message.author.displayAvatarURL())
    .setColor(0x00FF00)
    .addField("Invite link", `[discord bot invite](https://discord.com/oauth2/authorize?client_id=${invlink}&scope=bot&permissions=2088759031)`)
    message.channel.send(embed);
  }
}




//if (message.channel.nsfw) {
//  message.channel.send("This channel is NSFW.");
//} else {
//    message.channel.send("This channel is SFW.");
//}
//}
//});