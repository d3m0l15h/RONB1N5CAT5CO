const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("emitt")
        .setDescription("Emit command")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((options) => options
            .setName("guild_member_add")
            .setDescription("New member add."))
        .addSubcommand((options) => options
            .setName("guild_member_remove")
            .setDescription("Member leave the channel."))
}