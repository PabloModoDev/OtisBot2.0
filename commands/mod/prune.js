
  const { MessageEmbed } = require("discord.js")


  module.exports = {
    name: "prune",
    usage: "prune <cmd_name>",
    description: "Delete the custom commannd",
    category: "purge",
    run: async (client, message, args) => {
const amount = args.join(' '); // Amount of messages which should be deleted
const text = `Se han borrado ${amount} mensajes 🥳 😭 🛐 🌴`
if (!amount) return message.reply('No has puesto una cantidad de mensajes para borrar (ejemplo = ot!prune 4 = borra 4 mensajes)'); // Checks if the `amount` parameter is given
if (isNaN(amount)) return message.reply('La cantidad teine que ser un numero xd'); // Checks if the `amount` parameter is a number. If not, the command throws an error

if (amount > 100) return message.reply('No puedes borrar mas de 100'); // Checks if the `amount` integer is bigger than 100
if (amount < 1) return message.reply('Tienes que borrar mas de 1 mensaje'); // Checks if the `amount` integer is smaller than 1
message.channel.startTyping();
await message.channel.messages.fetch({ limit: amount }).then(messages => { // Fetches the messages
    message.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
)})
message.channel.stopTyping()

message.channel.send({ embed: { description: '```' +text+ '```', color: 'RED' } }).then(m => m.delete({timeout: 7000}))
        

}
  }