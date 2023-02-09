const { ChatInputCommandInteraction, Client } = require('discord.js');
const { loadCommands } = require('../../../Structures/Handlers/CommandHandler');

module.exports = {
    subCommand: "reload.commands",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        loadCommands(client);
        interaction.reply({content: "Reloaded Commands", ephemeral: true});
    }
}