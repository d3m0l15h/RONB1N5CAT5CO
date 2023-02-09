const { ChatInputCommandInteraction, Client } = require('discord.js');

module.exports = {
    subCommand: "emitt.guild_member_remove",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        client.emit('guildMemberRemove', interaction.member);
        interaction.reply({content: 'Emitted the event.', ephemeral: true})
    }
}