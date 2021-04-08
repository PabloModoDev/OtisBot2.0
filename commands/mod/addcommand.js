const db = require("quick.db")
const sendError = require('C:/Users/PCSSD/Desktop/Otis/misc/error.js')
module.exports = {
  name: "addcmd",
  usage: "addcmd <cmd_name> <cmd_responce>",
  description: "add guild custom commands",
  category: "mod",
  run: (client, message, args) => {


    if(!message.member.hasPermission("MANAGE_MESSAGES")) return sendError(":x: Ocupas `MANAGE_MESSAGES` para hacer este", message.channel)

    let cmdname = args[0]

    if(!cmdname) return sendError(`:x: Tenés que poner un nombre de comando, \`addcmd <cmd_name> <cmd_responce>\``, message.channel)

    let cmdresponce = args.slice(1).join(" ")

    if(!cmdresponce) return message.channel.send(`:x: You have to give command cmd responce, \`addcmd <cmd_name> <cmd_responce>\``)

    let database = db.get(`cmd_${message.guild.id}`)

    if(database && database.find(x => x.name === cmdname.toLowerCase())) return message.channel.send(":x: This command name is already added in guild custom commands.")

    let data = {
      name: cmdname.toLowerCase(),
      responce: cmdresponce
    }

    db.push(`cmd_${message.guild.id}`, data)

    return message.channel.send("Added **" + cmdname.toLowerCase() + "** as a custom command in guild.")


  }
}