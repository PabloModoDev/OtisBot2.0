const process = require('child_process')
module.exports = {
    name: "k",
    description: "Get the warnings of yours or mentioned person",
    category: "owner",
    ownerOnly: true,
    run: (client, message, args) => {
    message.channel.send('Ejecutando comando :thumbsup:').then(m => m.delete({timeout: 5000}))
    let x = args.join(' ')
    if(!x){
        return; 
    }
    process.exec(x, (error, stdout) => {
        let response = (error || stdout);
        message.channel.send(response, {code: "asciidoc", split: "\n"}).catch(err => message.channel.send(err))


    })
    return;
    } 
}