const { MessageEmbed } = require("discord.js");
const sendError = require("../../misc/error");

module.exports = {
  name: "leave",
  description: "e",
  usage: "leave <estado>",
  category: "music",
  run: async (client, message, args) => {
        let channel = message.member.voice.channel;
        if (!channel) return sendError("Tenés que estar en un canal de voz", message.channel);
        if (!message.guild.me.voice.channel) return sendError("No estoy en ningun canal de voz", message.channel);

        try {
            await message.guild.me.voice.channel.leave();
        } catch (error) {
            await message.guild.me.voice.kick(message.guild.me.id);
            return sendError("Tratando de salir del canal de voz", message.channel);
        }

        const Embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(" ✨ 🛐 Salí de <#" + channel +"> uwu")
            .setTimestamp();

        return message.channel.send(Embed).catch(() => message.channel.send("🎶 Left The Voice Channel :C"));
    }
  }