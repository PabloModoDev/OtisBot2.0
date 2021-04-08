module.exports = async (action, channel, user) => {
    let canal = db.get(`logging_${message.guild.id}`);
    if(!canal) return
    if(canal){
        
const sendError = require('/Users/PCSSD/3D Objects/Otis/misc/error')
 const url = `https://discord.com/api/webhooks/816919253844099132/zGmmXgqp8xfVrwjEoUFRFstHdsX4zMxExiLpkp7TgOAfbLPsNGVdEfu60lcnHnmjz2bg`;
 const fetch = require('node-fetch'); 
 fetch(url, { 
method: "POST", 
headers: { "Content-Type": "application/json" }, 
body: JSON.stringify({
"username": message.author.tag, 
"avatar_url": message.author.displayAvatarURL(),
"content": `<@&775151561084633089> nueva sugerencia o bug: ${action}`
}) });

  }
}
    
