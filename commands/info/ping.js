const Discord = require("discord.js");
module.exports = {
  name: "ping",
  description: " e",
  usage: "ping <estado>",
  category: "info",
  run: async (client, message, args) => {
    try {
      const m = await message.channel.send("Que pingeas cerdo..."); // Make sure the async is written, top of the client.on("message", ...)
      const embed = new Discord.MessageEmbed()
      .setColor("RANDOM") // Tired of choosing the embed colors? Just type "RANDOM" on it!
      .addField("⌛  Ping del comando", `**${m.createdTimestamp -  message.createdTimestamp}ms**`)
      .addField("💓 Ping de la api", `**${Math.round(client.ws.ping)}ms**`)
      .addField(":flag_cr:", `**Region del hosting: Costa Rica**`) // Use "client.ping" if your Discord.js is < 1.15.1 --- Use "client.ws.ping" if your Discord.js is > 12.0.0
      return m.edit(`Pong!`, embed);
    } catch (error) {
      return message.channel.send(`NEGRO DE MIERDA ME CRASHEE: ${error.message}`);
      // Restart the bot as usual.
    }
  }
}
 // easy way.