const db = require("quick.db")
const { addexp } = require("../handlers/xp.js");
const { ownerID, default_prefix } = require("../config.json");
const { badwords } = require("../data.json") 
let cooldown = {}
const sendError = require("../misc/error");
const { MessageFlags, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  addexp(message);


  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix; 
  if(message.content == `<@!${client.user.id}>` || message.content == `<@!${client.user.id}> help` || message.content == `<@!${client.user.id}> prefix`) return sendError(`El prefix en este servidor es ${prefix}`, message.channel)
  if (!message.content.startsWith(prefix) || message.content.startsWith(`<@!${client.user.id}>`)|| message.content.startsWith(`<@${client.user.id}>`)) return;

  if (!message.member)
    message.member = await message.guild.members.fetch(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let cmdx = db.get(`cmd_${message.guild.id}`)

  if (cmdx) {
    let cmdy = cmdx.find(x => x.name === cmd)
    if (cmdy) message.channel.send(cmdy.responce)
  }

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));


  if (!command) return;

  //-------------------------------------------- Permisos -------------------------------------------
  if (command.botPermission) {
    let neededPerms = []

    command.botPermission.forEach(p => {
      if (!message.guild.me.hasPermission(p)) neededPerms.push("`" + p + "`")
    })
    if (neededPerms.length) return sendError(`Ocupo permiso(s) de ${neededPerms.join(", ")} para ejecutar este comando`, message.channel)
  } else if (command.authorPermission) {
    let neededPerms = []
    command.authorPermission.forEach(p => {
      if (!message.member.hasPermission(p)) neededPerms.push("`" + p + "`")
    })
    if (neededPerms.length) return sendError(`${message.author.tag} ocupa permiso(s) de ${neededPerms.join(", ")} para ejecutar este comando`, message.channel)
  }

  // ---------------------------------------------O W N E R ----------------------------------------------------------

  if (command.ownerOnly) {
    if (message.author.id !== ownerID) return sendError('Este comando solo lo puede usar el creador del bot (pgbito.rar#6755)', message.channel)
  }

  //------------------------------------------------------COOLDOWN---------------------------------------------

  let uCooldown = cooldown[message.author.id];

  if (!uCooldown) {
    cooldown[message.author.id] = {}
    uCooldown = cooldown[message.author.id]
  }

  let time = uCooldown[command.name] || 2

  if (time && (time > Date.now())) return sendError(`Puedes usar este comando en ${Math.ceil((time - Date.now()) / 1000)} segundo(s)`, message.channel) //YOU CAN USE PARSE MS TO GET BETTER responce

  cooldown[message.author.id][command.name] = Date.now() + command.cooldown;
  if (command) command.run(client, message, args);
 






}


//-------------------------------------------- F U N C T I O N ------------------------------------------
function is_url(str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if(regexp.test(str)) {
    return true;
  } else {
    return false;
  }
  
}