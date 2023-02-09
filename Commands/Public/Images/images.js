const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('images')
            .setDescription('Images section')
            .addSubcommandGroup(subcommandGr => subcommandGr
                                                .setName('waifu')
                                                .setDescription('Satified your wibu soul')
                                                .addSubcommand(subcommand => subcommand
                                                    .setName('sfw')
                                                    .setDescription('Satified your wibu soul')
                                                    .addStringOption(options => options
                                                                                .setName('categories')
                                                                                .setDescription('Choose the category you want')
                                                                                .setRequired(true)
                                                                    )
                                                )
                                                .addSubcommand(subcommand => subcommand
                                                    .setName('help')
                                                    .setDescription('See what categories is available')
                                                )
            )
            .addSubcommand(subCommand => subCommand
                .setName('girls')
                .setDescription('Beauty girl images')
            )      
            
}