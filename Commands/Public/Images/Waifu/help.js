const { EmbedBuilder  } = require('discord.js');

module.exports = {
    subCommandGroup: "images.waifu.help",

    async execute(interaction, client) {
        const help = new EmbedBuilder()
                        .setColor('DarkButNotBlack')
                        .setTitle(`**WAIFU /HELP**`)
                        .addFields(
                            { name: 'Categories', value: `waifu\nneko\nshinobu\nmegumin\nbully\nsmile\nwave\nhighfive\nhandhold\nnom`, inline: true },
                            { name: 'Categories', value: `cuddle\ncry\nhug\nawoo\nkiss\nlick\nbite\nglomp\nslap\nkill\nkick`, inline: true },
                            { name: 'Categories', value: `pat\nsmug\nbonk\nyeet\nblush\nhappy\nwink\npoke\ndance\ncringe`, inline: true },
                        )
        return interaction.reply({ embeds: [help], ephemeral: true})
    }
}