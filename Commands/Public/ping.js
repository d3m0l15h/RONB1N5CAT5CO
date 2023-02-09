const { ChatInputCommandInteraction, SlashCommandBuilder, Client } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Ping"),
  /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
  execute(interaction, client) {
    interaction.reply({ content: `🏓 PONG! \`${client.ws.ping}ms\`` });
  }
};
