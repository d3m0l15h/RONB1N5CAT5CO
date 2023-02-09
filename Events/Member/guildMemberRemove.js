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

    const Goodbye = new WebhookClient({url: 'https://discord.com/api/webhooks/994911946610585650/aM0a1kPZSo9Yk89lWu3fhL_-UNOjThaO4XqZUDOvBzbp5kn19GEHmbCtfOToBoWmzjbZ'});

    const Leaving = new EmbedBuilder()
      .setColor("Red")
      .setAuthor({name: user.tag, iconURL: user.avatarURL({ dynamic: true, size: 512 })})
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