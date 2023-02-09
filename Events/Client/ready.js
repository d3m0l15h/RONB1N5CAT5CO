const { Client } = require('discord.js');
const { loadCommands } = require('../../Structures/Handlers/CommandHandler');
const { ActivityType } = require('discord.js');
module.exports = {
  name: 'ready',
  once: true,
  /**
     * @param {Client} client
     */
  async execute(client) {
    console.log('The client is ready!');
    client.user.setActivity('Ron\'s Gone Wrong', { type: ActivityType.Watching });
    loadCommands(client);

  }
};
