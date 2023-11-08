const { EmbedBuilder, WebhookClient, GuildMember } = require('discord.js');
const generateImageLeaving = require('../../Structures/Validation/GenerateImageLeaving.js');

module.exports = {
  name: 'guildMemberRemove',
  /**
     * 
     * @param {GuildMember} member
     */
  async execute(member) {
    const imgLV = await generateImageLeaving(member)

    const { user, guild } = member;

    const Goodbye = new WebhookClient({url: 'https://discord.com/api/webhooks/1124079441501487154/Rj_uLBNtoA8BVxKZoGVgm0gSylS-kH0mtbd8XBUc5sYyl-6Lh04ARshNSY7VBDxtY3At'});

    const Leaving = new EmbedBuilder()
      .setColor("Red")
      .setAuthor({name: user.username, iconURL: user.avatarURL({ dynamic: true, size: 512 })})
      .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
      .setDescription(`
        ${member} has left!\n
        Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\n
        Latest Member Count: **${guild.memberCount}**`)
      .setImage('attachment://leaving.png')
      .setFooter({text: `ID: ${user.id}`})

    await Goodbye.send({ embeds: [Leaving], files: [imgLV] })
  }
}