module.exports = {
    name: "nsfw",
    description: "w",
    usage: "nsfw <xyz>",
    category: "nsfw",
    cooldown: 2,
    run: async (client, message, args) => {
if (message.channel.nsfw) {
  message.channel.send("```js true```");
} if (!message.channel.nsfw){
  message.channel.send("```js false```");
}
    }
}