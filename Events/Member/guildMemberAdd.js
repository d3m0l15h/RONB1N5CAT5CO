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
  
      const Welcomer = new WebhookClient({ url: 'https://discord.com/api/webhooks/1124079441501487154/Rj_uLBNtoA8BVxKZoGVgm0gSylS-kH0mtbd8XBUc5sYyl-6Lh04ARshNSY7VBDxtY3At' });
  
      const Welcome = new EmbedBuilder()
        .setColor("DarkGreen")
        .setAuthor({name: user.username, iconURL: user.avatarURL({ dynamic: true, size: 512 })})
        .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
        .setDescription(`
          Welcome ${user} to **${guild.name}**!\n
          Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
        .setImage('attachment://welcome.png')
        .setFooter({text: `ID: ${user.id}`})
  
      await Welcomer.send({ embeds: [Welcome], files: [imgWC] });
  
    }
  }