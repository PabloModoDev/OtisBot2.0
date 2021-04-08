const db = require("quick.db")

module.exports.run = (client) => {
  console.log(`Running ${client.user.tag} with ${client.ws.ping} ping \n Bot ID: ${client.user.id} \n Bot avatar: ${client.user.displayAvatarURL()}`)
  client.user.setActivity(db.get(`status`)); 

}