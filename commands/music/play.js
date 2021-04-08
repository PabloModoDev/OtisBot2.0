const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require("fs");
const db = require('quick.db')
const token = require('../../config.json')
SOUNDCLOUDT = token.SOUNDCLOUD_CLIENT_ID
const scdl = require("soundcloud-downloader").default;
const sendError = require('../../misc/error')
  module.exports = {
    name: "play",
    category: "music",
    usage: "play <nombre de un video de youtube>",
    description: "Sirve para musica lol",
    aliases: ["p"],


    run: async function (client, message, args) {
        let channel = message.member.voice.channel;
        if (!channel)return sendError("Necesitas estar en un voice channel", message.channel);
        let prefix = db.get(`prefix_${message.guild.id}`);
        if (prefix === null) prefix = 'ot!';
        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT"))return sendError('Revisa si tengo los siguientes permisos: \n `CONNECT``', message.channel);
        if (!permissions.has("SPEAK"))return sendError('❌ Revisa si tengo los siguientes permisos: \n `SPEAK``', message.channel);
          
        var searchString = args.join(" ");
        if (!searchString)return sendError("❌ | Especifica el nombre del video despues de " + prefix + "play", message.channel);
        const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
        var serverQueue = message.client.queue.get(message.guild.id);

        let songInfo = null;
        let song = null;
        if (url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
            try {
                songInfo = await ytdl.getInfo(url);
                if(!songInfo)return sendError("No se ha podido acceder a esta cancion en YouTube", message.channel);
                song = {
                    id: songInfo.videoDetails.videoId,
                    title: songInfo.videoDetails.title,
                    url: songInfo.videoDetails.video_url,
                    img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
                    duration: songInfo.videoDetails.lengthSeconds,
                    ago: songInfo.videoDetails.publishDate,
                    views: String(songInfo.videoDetails.viewCount).padStart(10, " "),
                    req: message.author,
                };
            } catch (error) {
                console.error(error);
                return message.reply(error.message).catch(console.error);
            }
        } else if (url.match(/^https?:\/\/(soundcloud\.com)\/(.*)$/gi)) {
            try {
                songInfo = await scdl.getInfo(url);
                if(!songInfo)return sendError("No se ha podido acceder a esta cancion en SoundCloud", message.channel);
                song = {
                    id: songInfo.permalink,
                    title: songInfo.title,
                    url: songInfo.permalink_url,
                    img: songInfo.artwork_url,
                    ago: songInfo.last_modified,
                    views: String(songInfo.playback_count).padStart(10, " "),
                    duration: Math.ceil(songInfo.duration / 1000),
                    req: message.author,
                };
            } catch (error) {
                console.error(error);
                return sendError(error.message, message.channel).catch(console.error);
            }
        } else {
            try {
                var searched = await yts.search(searchString);
                if (searched.videos.length === 0)return sendError("No se ha podido acceder a esta cancion en YouTube", message.channel);

                songInfo = searched.videos[0];
                song = {
                    id: songInfo.videoId,
                    title: Util.escapeMarkdown(songInfo.title),
                    views: String(songInfo.views).padStart(10, " "),
                    url: songInfo.url,
                    ago: songInfo.ago,
                    duration: songInfo.duration.toString(),
                    img: songInfo.image,
                    req: message.author,
                };
            } catch (error) {
                console.error(error);
                return message.reply(error.message).catch(console.error);
            }
        }

        if (serverQueue) {
              serverQueue.songs.push(song);
              let thing = new MessageEmbed()
              thing.setThumbnail(song.img)
              thing.addField("playing: ", `[${song.title}](${song.url})`)
              thing.setColor(0x4287f5)
              return message.channel.send(thing) 
        }

        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: channel,
            connection: null,
            songs: [],
            volume: 80,
            playing: true,
            loop: false,
        };
        message.client.queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);

        const play = async (song) => {
            const queue = message.client.queue.get(message.guild.id);
            if (!song) {
                message.channel.send(`Saliendo de ${channel} \n\nSi deseas que <@!${client.user.id}> se quede en el canal de voz podés donar con el comando ot!donate`).then(m => m.delete({timeout: 5000}))
                message.guild.me.voice.channel.leave(); //If you want your bot stay in vc 24/7 remove this line :D
                message.client.queue.delete(message.guild.id);
                return;
            }
            let stream;
            let streamType;

            try {
                if (song.url.includes("soundcloud.com")) {
                    try {
                        stream = await scdl.downloadFormat(song.url, scdl.FORMATS.OPUS, SOUNDCLOUDT);
                    } catch (error) {
                        stream = await scdl.downloadFormat(song.url, scdl.FORMATS.MP3, SOUNDCLOUDT);
                        streamType = "unknown";
                    }
                } else if (song.url.includes("youtube.com")) {
                    stream = await ytdl(song.url, {filter: "audioonly" , quality: "highestaudio", highWaterMark: 1 << 25 ,type: "opus"})
                    stream.on("error", function (er) {
                        if (er) {
                            if (queue) {
                                queue.songs.shift();
                                play(queue.songs[0]);
                                return sendError(`Error ${er}`, message.channel);
                            }
                        }
                    });
                }
            } catch (error) {
                console.log();
                if (queue) {
                    queue.songs.shift();
                    play(queue.songs[0]);
                }
            }
            queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
            const dispatcher = queue.connection.play(stream).on("finish", () => {
                const shiffed = queue.songs.shift();
                if (queue.loop === true) {
                    queue.songs.push(shiffed);
                }
                play(queue.songs[0]);
            });

            dispatcher.setVolumeLogarithmic(queue.volume / 100);
            let thing = new MessageEmbed()
            thing.setThumbnail(song.img)
            thing.addField("playing: ", `[${song.title}](${song.url})`)
            thing.setColor(0x4287f5)
            return message.channel.send(thing)
        };

        try {
            const connection = await channel.join();
            queueConstruct.connection = connection;
            play(queueConstruct.songs[0]);
        }  catch (error) {
          console.error(` : ${error}`);
          message.client.queue.delete(message.guild.id);
          await channel.leave();
          return sendError(`I could not join the voice channel: ${error}`, message.channel);
        }
      
    },
};