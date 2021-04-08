const { MessageEmbed } = require("discord.js")

exports.run = (client, message, args) => {
  if(message.content === (">ayuda")){
    const embed = new MessageEmbed()
    .setTitle("**Comandos facheros de OtisBot**")
    .setAuthor(message.member.displayName, message.author.displayAvatarURL())
    .setColor(0x1f7310)
    .setThumbnail('https://cdn.discordapp.com/attachments/723244521927999498/723253562288898139/LINEA_DE_COLORES-1-2-1-5.gif')
    .addField("***Comanditos de musica***", "")
    .addField("`>play`", "***Reproduce la musica***")
    .addField("`>stop`", "***Deja de reproducir la musica***")
    .addField("`>resume`", "***Abandona el modo pausa***")
    .addField("`>pausa`", "***Pausa la musica temporalment***")
    .addField("`>playlist`", "***Muestra la lista de canciones que han pedido***")
    .addField("`>volumen`", "***Podes subirle el volumen de 0 a 10***")
    .addField("`>skip`", "***Cambia la cancion que se va a reproducir***")
    .addField("`>ayuda`", "***Muestra esta lista qlia***")
    .addField("***Comanditos de moderacion***", ".")
    .addField("`>ban`", "***Banea al usuario mencionad o***")
    .addField("`>avatar`", "***Muestra tu foto de usuario actual***")
    .addField("`>kick`", "***Kickea a un usuario***")
    .addField("`>invite`", "***Muestra el link de invite***")    
    .addField("Servidor de soporte", "[Pincha aca para unirte](https://discord.gg/p5Yyjedryd)")
    .addField(`Creador:`, `<@763931943300759582>`, `y`, `<@574681980495724545>`, ".")
    .addField(`Colaborador :thumbsup::`, `<@574681980495724545>`)
    message.channel.send(embed)
    .then(sentMessage => sentMessage.delete({ timeout: 5000 }))
    .catch(console.error)
  }

};
  
