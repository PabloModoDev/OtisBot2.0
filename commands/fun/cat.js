exports.run = (client, message, args) => {
    const fetch = require('node-fetch')
    const {MessageAttachment} = require('discord.js');
    const {body} = fetch('https://some-random-api.ml/img/cat').then(res => res.json()).then(result => {
      const attachment = new MessageAttachment(result.link);
      message.channel.send(":)", attachment)
    })
  
}