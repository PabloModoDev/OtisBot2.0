const ytdl = require('ytdl-core')
const fs = require('fs');
const { MessageEmbed, MessageAttachment } = require('discord.js')
const cp = require('child_process');
const readline = require('readline');
const ffmpeg = require('ffmpeg-static');
const { chmod } = require('fs');
const { videoResize } = require('node-video-resize')
const path = require('path')
exports.run = async (client, message, args) => {
const ref = args.join(' ');
if(!ref) return message.channel.send(
    'Ocupai poner una url de youtube :rage:'
)
const tracker = {
  start: Date.now(),
  audio: { downloaded: 0, total: Infinity },
  video: { downloaded: 0, total: Infinity },
  merged: { frame: 0, speed: '0x', fps: 0 },
};
const m = await message.channel.send('Creando archivo (esto podria durar mas de lo esperado)');
let videoid = ytdl.getURLVideoID(ref); 
const audio = ytdl(ref, { quality: 'highestaudio'})
  .on('progress', (_, downloaded, total) => {
    tracker.audio = { downloaded, total };
  })
const video = ytdl(ref, {quality: '136' })
  .on('progress', (_, downloaded, total) => {
    tracker.video = { downloaded, total };
  });
let progressbarHandle = null;
const progressbarInterval = 1000;
const showProgress = () => {
  readline.cursorTo(process.stdout, 0);
  const toMB = i => (i / 1024 / 1024).toFixed(2);
  process.stdout.write(`Audio  | ${(tracker.audio.downloaded / tracker.audio.total * 100).toFixed(2)}% processed `);
  process.stdout.write(`(${toMB(tracker.audio.downloaded)}MB of ${toMB(tracker.audio.total)}MB).${' '.repeat(10)}\n`);

  process.stdout.write(`Video  | ${(tracker.video.downloaded / tracker.video.total * 100).toFixed(2)}% processed `);
  process.stdout.write(`(${toMB(tracker.video.downloaded)}MB of ${toMB(tracker.video.total)}MB).${' '.repeat(10)}\n`);

  process.stdout.write(`Merged | processing frame ${tracker.merged.frame} `);
  process.stdout.write(`(at ${tracker.merged.fps} fps => ${tracker.merged.speed}).${' '.repeat(10)}\n`);

  process.stdout.write(`running for: ${((Date.now() - tracker.start) / 1000 / 60).toFixed(2)} Minutes.`);
  readline.moveCursor(process.stdout, 0, -3);
};
const ffmpegProcess = cp.spawn(ffmpeg, [
  '-loglevel', '8', '-hide_banner',
  '-progress', 'pipe:3',
  '-i', 'pipe:4',
  '-i', 'pipe:5',
  '-map', '0:a',
  '-map', '1:v',
  '-c:v', 'copy',
  `./nig/videor${message.id}.mp4`,
], {
  windowsHide: true,
  stdio: [
    'inherit', 'inherit', 'inherit',
    'pipe', 'pipe', 'pipe',
  ],
});
ffmpegProcess.on('close', () => {
  const megas = (tracker.video.total)
  message.channel.send(megas)
  if(megas >= 7685945){
    const videoPath = path.resolve(__dirname, `./nig/videor${message.id}.mp4`)
    const outputPath = path.resolve(__dirname, `./pog/pog${message.id}.mp4`)
    const bootstrap = async () => {
      const ret = await videoResize({
        inputPath: videoPath,
        outputPath,
        format: 'mp4',
        size: '640x480'
      })
      console.log(ret)
    }
    bootstrap()
    const attachment = new MessageAttachment(`./pog/pog${message.id}.mp4`, `video.mp4`);
  const embed = new MessageEmbed()
    .setTitle(`:flag_cc:`)
    .attachFiles(attachment)
  message.channel.send(embed)
  m.edit('LISTO :thumbsup:')
  }
  const attachment = new MessageAttachment(`./nig/videor${message.id}.mp4`, `video.mp4`);
  const embed = new MessageEmbed()
    .setTitle(`:flag_cc:`)
    .attachFiles(attachment)
  message.channel.send(embed)
  m.edit('LISTO :thumbsup:')
  process.stdout.write('\n\n\n\n');
  clearInterval(progressbarHandle)
});
ffmpegProcess.stdio[3].on('data', chunk => {
  if (!progressbarHandle) progressbarHandle = setInterval(showProgress, progressbarInterval);
  const lines = chunk.toString().trim().split('\n');
  const args = {};
  for (const l of lines) {
    const [key, value] = l.split('=');
    args[key.trim()] = value.trim();
  }
  tracker.merged = args;
});
audio.pipe(ffmpegProcess.stdio[4]);
video.pipe(ffmpegProcess.stdio[5])
   
    }

