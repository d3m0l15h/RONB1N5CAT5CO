const { EmbedBuilder, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    subCommand: "music.filters",
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
        
        const filter = options.getString('types');

        if (filter === 'off' && queue.filters.size) queue.filters.clear();

        else if (Object.keys(client.distube.filters).includes(filter)) {
            if (queue.filters.has(filter)) queue.filters.remove(filter);
            else queue.filters.add(filter);
        } else if (options.getString('types'))
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor('Red')
                    .setDescription(`❌ Not a valid filter`)]
            })

        interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor('Aqua')
                .setDescription(`Current Queue Filter: \`${queue.filters.names.join(', ') || 'Off'}\``)]
        })
    }
}