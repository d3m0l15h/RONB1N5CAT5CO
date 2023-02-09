const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Get avatar")
    .addUserOption(options => options
        .setName("member")
        .setDescription("Get your avatar or other members")
        .setRequired(false)),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { options, user } = interaction

        const Member = options.getUser("member") || user

        Avatar = new EmbedBuilder()
        .setColor("DarkButNotBlack")
        .setAuthor({name: Member.tag, iconURL: Member.avatarURL({size: 512})})
        .setDescription(`Avatar of **${Member.tag}**`)
        .setImage(Member.avatarURL({size: 1024}))
            
        await interaction.reply({embeds: [Avatar]});
    }
}