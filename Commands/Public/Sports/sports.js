const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sports')
        .setDescription('Sports section')
        .addSubcommandGroup(subcommandGr => subcommandGr
            .setName('soccer')
            .setDescription('Soccer section')
            .addSubcommand(subcommand => subcommand
                .setName('matches')
                .setDescription('Today matches')
            )
        )

}