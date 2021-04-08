const Booru = require('booru')
exports.run = async (client, message, args) => {
const carlos = args.join(' ')
Booru.search('xbooru', [carlos], { limit: 3, random: true })
  .then(posts => {
    for (let post of posts)
      message.channel.send(post.fileUrl, post.postView)
  })
 
// or (using alias support and creating boorus)
const sb = Booru.forSite('sb')
 
sb.search(['cat', 'dog'], { limit: 2 })
}