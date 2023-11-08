const { ChatInputCommandInteraction, EmbedBuilder, Client } = require('discord.js')
module.exports = {
    subCommand: "music.play",
    /** 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { member, options, channel, guild } = interaction;
        const VoiceChannel = member.voice.channel;
        const query = options.getString("query");

        if (!VoiceChannel)
            return interaction.reply({ content: `You must be in a voice channel to be able to use this command!`, ephemeral: true });
        if (guild.members.me.voice.channelId && VoiceChannel.id !== guild.members.me.voice.channelId)
            return interaction.reply({ content: `I'm already playing music in other voice channel`, ephemeral: true });

        client.distube.play(VoiceChannel, query, { textChannel: channel, member: member });

        interaction.reply({ content: "Request received" })
        return interaction.deleteReply({ timeout: 300000 })
    }
}