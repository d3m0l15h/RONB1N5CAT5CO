const { ChatInputCommandInteraction, Client } = require('discord.js');

module.exports = {
    subCommand: "emitt.guild_member_add",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        client.emit("guildMemberAdd", interaction.member);
        await interaction.reply({content: "Emitted the event.", ephemeral: true})
    }
}