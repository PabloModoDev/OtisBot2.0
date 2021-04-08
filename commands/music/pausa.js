exports.run = (client, message, args) => {
  const serverQueue = message.client.queue.get(message.guild.id);
  if (serverQueue && serverQueue.playing) {
    serverQueue.playing = false;
    serverQueue.connection.dispatcher.pause();
    return message.channel.send("Pausado joder").then(async msg => {
    await msg.react("✅");
  // We're gonna using an await, to make the react are right in order.
})
}



  return message.channel.send("No hay nada sonando");
};
