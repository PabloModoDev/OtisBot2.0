const { MessageEmbed } = require("discord.js");
const sendError = require('../../misc/error')

module.exports = {
  name: "loop",
  category: "music",
  usage: "loop <nombre de un video de youtube>",
  description: "Sirve para musica lol",
  aliases: ["l"],


  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
       if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return message.channel.send({
                embed: {
                    color: "GREEN",
                    description: `🔁  **|**  El loop esta **\`${serverQueue.loop === true ? "enabled" : "disabled"}\`**`
                }
            });
        };
    return sendError("No hay nada sonando", message.channel);
  },
};
