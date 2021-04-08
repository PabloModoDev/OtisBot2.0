    const { DiscordAPIError } = require("discord.js");
    const Discord = require("discord.js");
    const { MessageEmbed } = require("discord.js")


    const moment = require("moment")
    module.exports = {
        name: "userinfo",
        aliases: ["whois", "user"],
        usage: "userinfo <MENTION>",
        description: "Get advance stats of given person or yourself",
        run: async (client, message, args) => {
        let user;

    if (!args[0]) {
      user = message.member;
    } else {

     user = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(err => { return message.channel.send(":x: Unable to find this Person") })
    }
            
            if (user.presence.status === "dnd") user.presence.status = "No molestar";
            if (user.presence.status === "idle") user.presence.status = "Ausente";
            if (user.presence.status === "offline") user.presence.status = "Desconectado";
            if (user.presence.status === "online") user.presence.status = "En linea";

        
            
        
        function game() {
        let game;
        if (user.presence.activities.length >= 1) game = `${user.presence.activities[0].type} ${user.presence.activities[0].name}`;
        else if (user.presence.activities.length < 1) game = " "; // Revisa si hay algun juego en el usuario
        return game; // Tira el resultado
        }
        
        let x = Date.now() - user.createdAt; 
        let y = Date.now() - message.guild.members.cache.get(user.id).joinedAt; 
        let created = Math.floor(x / 86400000); // 5 digits-zero.
        let joined = Math.floor(y / 86400000);
        
        const member = message.guild.member(user);
        let nickname = member.nickname !== undefined && member.nickname !== null ? member.nickname : "No tiene";
        let createdate = moment.utc(user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss"); // User Created Date
        let joindate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss"); // User Joined the Server Date
        let avatar = user.user.displayAvatarURL({ dynamic: true }) // Use 2048 for high quality avatar.
        let status = user.presence.status;
            
            const embed = new Discord.MessageEmbed()
                .setAuthor(user.tag, avatar)
                .setThumbnail(avatar, )
                .setColor(0x56db00)
                .addField(":diamond_shape_with_a_dot_inside: ID", user.id, true)
                .addField(":diamond_shape_with_a_dot_inside: Apodo", nickname, true)
                .addField(":diamond_shape_with_a_dot_inside: Cuenta creada en", `${createdate} \nhace ${created} dias`, true)
                .addField(":diamond_shape_with_a_dot_inside: Se unio al servidor en", `${joindate} \nhace ${joined} dias`, true)
                .addField(":diamond_shape_with_a_dot_inside: Status", status, true)
                .addField(":diamond_shape_with_a_dot_inside: Jugando a", game(), true)

                message.channel.send(embed)

        
        
    }
}