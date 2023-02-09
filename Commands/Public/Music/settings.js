const { ChatInputCommandInteraction, EmbedBuilder, Client,
    ButtonBuilder } = require('discord.js');

const { paginationEmbed } = require('../../../Structures/Functions/paginationEmbed');
module.exports = {
    subCommand: "music.settings",
    /** 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { member, options, guild } = interaction;

        const VoiceChannel = member.voice.channel;

        if (!VoiceChannel)
            return interaction.reply({ content: `You must be in a voice channel to be able to use this command!`, ephemeral: true });
        if (guild.members.me.voice.channelId && VoiceChannel.id !== guild.members.me.voice.channelId)
            return interaction.reply({ content: `I'm already playing music in other voice channel`, ephemeral: true });

        const queue = await client.distube.getQueue(VoiceChannel);

        if (!queue) return interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor('Orange')
                .setDescription("There is nothing in the queue right now!")],
            ephemeral: true
        });

        try {
            switch (options.getString("options")) {

                case "pause": {
                    await queue.pause(VoiceChannel);
                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setColor("Aqua")
                            .setDescription("⏸️ Pause the song")]
                    })
                }

                case "resume": {
                    await queue.resume(VoiceChannel);
                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setColor("Aqua")
                            .setDescription("▶️ Resume the song")]
                    })
                }

                case "skip": {
                    await queue.skip(VoiceChannel);
                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setColor("Aqua")
                            .setDescription("⏭️ Skip to the next song")]
                    })
                }

                case "previous": {
                    await queue.previous(VoiceChannel);
                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setColor("Aqua")
                            .setDescription("⏮️ Play the previous song")]
                    })
                }

                case "stop": {
                    await queue.stop(VoiceChannel);
                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setColor("Aqua")
                            .setDescription("⏹️ Stopped!")]
                    })
                }

                case "shuffle": {
                    await queue.shuffle(VoiceChannel);
                    await queue.skip(VoiceChannel);
                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setColor("Aqua")
                            .setDescription("🔀 Shuffle queue")]
                    })
                }

                case "autoplay": {
                    const mode = queue.toggleAutoplay(VoiceChannel);
                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setColor("Aqua")
                            .setDescription(`♾️ Set autoplay mode to: ${mode ? `**On**` : `**Off**`}`)]
                    })
                }

                case "repeat": {
                    let mode2 = await client.distube.setRepeatMode(queue);
                    return interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setColor("Aqua")
                            .setDescription(`🔁 Set repeat mode to: ${mode2 = mode2 ? mode2 == 2 ? `**Queue**` : `**Song**` : `**Off**`}`)]
                    })
                }

                case "queue": {
                    const pages = await generateQueue(queue.songs);

                    const button1 = new ButtonBuilder()
                        .setCustomId('previousbtn')
                        .setLabel('<')
                        .setStyle('Secondary');
                    const button2 = new ButtonBuilder()
                        .setCustomId('nextbtn')
                        .setLabel('>')
                        .setStyle('Secondary');

                    const buttonList = [button1, button2]

                    return paginationEmbed(interaction, pages, buttonList);

                }
            }
        } catch (e) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor("DarkRed")
                    .setDescription(`${e}`)
                ],
                ephemeral: true
            })
        }
    }

}

function generateQueue(queue) {
    const embeds = [];
    var k = 10;
    for (let i = 0; i < queue.length; i += 10) {
        let arrayOfSong = queue.slice(i, k);
        let j = i;
        const info = arrayOfSong.map(song => `**${++j}. ${song.name}**`).join('\n');

        const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`${info}`);
        embeds.push(embed);
        k += 10;
    }
    return embeds;
}

// async function getInfo(songs, info) {
    
//     for( let song of songs ) {

//     }
// }