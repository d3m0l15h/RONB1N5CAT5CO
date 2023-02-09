const { EmbedBuilder, WebhookClient, GuildMember } = require('discord.js');
const generateImageWelcome = require('../../Structures/Validation/GenerateImageWelcome.js');

module.exports = {
    name: "guildMemberAdd",
    /**
       * 
       * @param {GuildMember} member
       */
    async execute(member) {
      const imgWC = await generateImageWelcome(member);
  
      const { user, guild } = member;
  
      const Welcomer = new WebhookClient({ url: 'https://discord.com/api/webhooks/994911946610585650/aM0a1kPZSo9Yk89lWu3fhL_-UNOjThaO4XqZUDOvBzbp5kn19GEHmbCtfOToBoWmzjbZ' });
  
      const Welcome = new EmbedBuilder()
        .setColor("DarkGreen")
        .setAuthor({name: user.tag, iconURL: user.avatarURL({ dynamic: true, size: 512 })})
        .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
        .setDescription(`
          Welcome ${member} to **${guild.name}**!\n
          Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
        .setImage('attachment://welcome.png')
        .setFooter({text: `ID: ${user.id}`})
  
      await Welcomer.send({ embeds: [Welcome], files: [imgWC] });
  
    }
  }