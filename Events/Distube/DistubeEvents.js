const { EmbedBuilder } = require('discord.js')
const client = require('../../index')
const SpotifyAPI = require('../../Structures/Functions/SpotifyAPI');


const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``

client.distube
  .on('playSong', async (queue, song) => {
    const spotify = new SpotifyAPI(song.name);
    await spotify.getTrack();
    const name = String(song.name).includes( String(spotify.getName())) ? spotify.getName() : song.name;
    
    const artist = String(song.uploader.name).includes(String(spotify.getArtist())) ? spotify.getArtist() : song.uploader.name;
    
    queue.textChannel.send({
      embeds: [new EmbedBuilder()
        .setColor("Green")
        .setTitle(`PLAY`)
        .setDescription(
          `🎵 | **${name}**
          \n **By**: ${artist}
          \n${status(queue)}`)
      ]
    })
  }
  )
  .on('addSong', async (queue, song) => {
    const spotify = new SpotifyAPI(song.name);
    await spotify.getTrack();

    const name = String(song.name).includes(String(spotify.getName())) ? spotify.getName() : song.name;
    
    const artist = String(song.uploader.name).includes(String(spotify.getArtist())) ? spotify.getArtist() : song.uploader.name;
    
    queue.textChannel.send({
      embeds: [new EmbedBuilder()
        .setColor("Green")
        .setTitle(`ADD`)
        .setDescription(
          `🎶 | **${name}**
          \n **By**: ${artist}`)
        .setFooter({ text: `Requested by ${song.user.tag}`, iconURL: song.user.displayAvatarURL() })
      ]
    })
  }
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send({
      embeds: [new EmbedBuilder()
        .setColor("Green")
        .setTitle("PLAYLIST")
        .setDescription(`🎶 | \`${playlist.name}\``)
        .addFields({ name: `**Track**`, value: `${playlist.songs.length}` })
      ]
    })
  )
  .on('error', (channel, e) => {
    if (channel) channel.send({
      embeds: [new EmbedBuilder()
        .setColor('DarkRed')
        .setDescription(`❌ | An error encountered: ${e.toString().slice(0, 1974)}`)
      ]
    });
    else console.error(e);
  })
  .on('empty', queue => queue.textChannel.send({
    embeds: [new EmbedBuilder()
      .setColor('Green')
      .setDescription(`**Voice channel is empty! Leaving the channel...**`)
    ]
  }))
  .on('searchNoResult', (message, query) =>
    message.channel.send(`📃 | No result found for \`${query}\`!`)
  )
  .on('finish', queue => queue.textChannel.send({
    embeds: [new EmbedBuilder()
      .setColor('Green')
      .setDescription('☑️ Finished!')
    ]
  })
  )